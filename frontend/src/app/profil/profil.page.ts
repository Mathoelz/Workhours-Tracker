
/******************************************************************
***** Name: profil.page.ts
***** Ver.: 0.2
***** Date: 02.01.2020
***** Auth: Maxim Zitnikowski
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: Alle Funtionen und Variable in Englisch
******************************************************************/

// Imports werden alphabetisch sortiert
import { AlertController, ModalController, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { WorkhoursService } from './../services/workhours.service';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';

// import { TranslateConfigService } from '../translate-config.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})

export class ProfilPage implements OnInit {

  /* ---- Variablen Block ---- */

  // User aus der Datenbank
  user: User;
  // Die Variable häkt den akt. Tag
  current = new Date().toISOString();
  // ProfilBild
  profileImage = 'assets/img/no-avatar-found.png'
  // Monatsfortschritt
  progress: any

  /* ---- Konstruktor Block ---- */

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private authService: AuthService,
    private alertService: AlertService,
    public modalController: ModalController,
    private work: WorkhoursService,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    @Inject(Crop) private crop: Crop,
    @Inject(File) public file: File

    /*private translateConfigService: TranslateConfigService*/) {

    //this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.getWorkingHoursTillNow();
        this.getWorkingDaysTillNow();
        this.calculateSalary();
      }
    );
  }

  ngOnInit() { }

  /* ---- Funktionen Block ---- */

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 400, //what widht you want after capaturing
      targetHeight: 400,
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Wählen Sie eine Aktion aus",
      buttons: [{
        text: 'Galerie durchsuchen',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Kamera benutzen',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    /* this.crop.crop(fileUrl, {targetWidth: 2000, targetHeight: 2000})
       .then(
         
         newPath => */
    //console.log('new image path is: ' + newPath),
    this.showCroppedImage(fileUrl.split('?')[0])


       /* error => 
          alert('Error cropping image' + error)
        
      );*/
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }

  /**
  * 
  *  Funktion: Funktion zum Initialisieren der Variable "User.workingHoursTillNow". 
  *                Der Wert sind die Arbeitsstunden im aktuellen Monat.
  *  Rückgabe: keine
  */
  getWorkingHoursTillNow() {
    this.user.workingHoursTillNow = 0;
    this.work.getMonth(this.current).subscribe(result => {
      if (result != null) {
        // Alle Arbeitsstunden im aktuellen Monat zusammenaddieren
        for (let i = 0, l = Object.keys(result).length; i < l; i++) {
          this.user.workingHoursTillNow += result[i].hours;
        }
        // 'workingHoursTillNow' auf zwei Nachkommastellen runden
        this.user.workingHoursTillNow = Number(this.user.workingHoursTillNow.toFixed(2))
        // Den Fortschritt des akt. Monats in Prozent berechnen
        this.progress = this.calculateProgressInPercent();
      }
    });
  }

  /**
  * 
  *  Funktion: Funktion zum Initialisieren der Variable "User.workingDaysTillNow". 
  *                Der Wert sind die Arbeitstage im aktuellen Monat.
  *  Rückgabe: keine
  */
  getWorkingDaysTillNow() {
    this.work.getMonth(this.current).subscribe(result => {
      if (result != null) {
        this.user.workingDaysTillNow = Object.keys(result).length;
      }
    });
  }

  /**
  * 
  *  Funktion: Funktion zum Berechnen des Zielfortschrittes bez. Arbeitsstunden im aktuellen Monat.
  *                Der Wert ist Fortschritt auf einer Skala von 0 bis 1 
  *  Rückgabe: Habenstunden / Sollstunden
  **/
  getTargetProgress() {
    // Als 'true' auswerten wenn die Werte nicht : 
    //        << null, undefined, NaN, leeres String '', 0, false >> sind
    if (this.user.monthTarget && this.user.workingHoursTillNow) {
      // Wenn die Habenstunden größer als Sollstunden sind
      if (this.user.workingHoursTillNow > this.user.monthTarget) {
        return 1;
        // Sosnt berechne den Fortschritt
      } else {
        return (this.user.workingHoursTillNow / this.user.monthTarget);
      }
    }
    return 0;
  }

  /**
  * 
  *  Funktion: Funktion zum Berechnen des Bruttogehalts. 
  *  Rückgabe: keine
  **/
  calculateSalary() {
    this.user.grossSalary = 0;
    this.work.getMonth(this.current).subscribe(result => {
      if (result != null) {
        // Die Arbeitsstunden von jedem Arbeitstag werden die mit den BruttoStundenlohn multipliziert
        for (let i = 0, l = Object.keys(result).length; i < l; i++) {
          // Die Berechnung wird in der Variablen 'grossSalary' gespeichert
          this.user.grossSalary += result[i].hours * this.user.hourlyWage;
        }
        this.user.grossSalary = Number(this.user.grossSalary.toFixed(2))
      }
    });
  }

  /**
  * 
  *  Funktion: Zeigt ein AllertController "Profil bearbeiten..." an. 
  *             Der User kann darinnen seine Daten bearbeiten.
  *  Rückgabe: keine
  **/
  async profil_bearbeiten() {
    const alert = await this.alertController.create({
      header: 'Profil bearbeiten',
      message: 'Geben Sie Ihre Daten ein',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.user.name,
          placeholder: 'Name',
        },
        {
          name: 'monthTarget',
          type: 'number',
          value: this.user.monthTarget,
          placeholder: 'Monatsziel (Std)'
        },
        {
          name: 'hourlyWage',
          type: 'number',
          value: this.user.hourlyWage,
          placeholder: 'Stundenlohn'
        }
      ],
      buttons: [
        {
          text: 'abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'aktualisieren',
          handler: data => {
            console.log(data);
            this.updateUser(data);
          }
        }
      ],
    });
    await alert.present();
  }

  /**
  * 
  *  Funktion: Aktuallisiert die Userdaten in der Datenbank 
  *  Rückgabe: keine
  **/
  updateUser(dataset) {
    this.authService.update(dataset).subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        // Die Seite neu laden
        this.refreshPage();
      }
    )
  }

  /**
   * 
   *  Funktion: Berechnet den Fortschritt des akt. Monats
   *   
   **/
  calculateProgressInPercent() {
    // falls die Zielstunden noch nicht gesetzt sind
    if (!this.user.monthTarget) {
      return 0;
    }
    // falls das Monatsziel überschritten wurde
    if (this.user.workingHoursTillNow >= this.user.monthTarget) {
      return 100;
    }
    // Eine geschickte Verwendugn des Dreisatzes
    var progress = (this.user.workingHoursTillNow * 100) / this.user.monthTarget
    // 'progress' auf zwei Nachkommastellen runden
    progress = Number(progress.toFixed(1));
    return progress;
  }

  /**
  * 
  *  Funktion: Die Funktion wird durch eine "Pull to Refresh Action" aufgerufen
  *             die Funktion lädt die Seite neu (User wird neu initialisiert)
  *  Rückgabe: keine
  **/
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      // die Seite neuladen
      this.refreshPage();
      console.log('Async operation has ended');
      refresher.target.complete();
    }, 2000);
  }

  /**
   * 
   *  Funktion: Die Funktion lädt die Seite neu (User wird neu initialisiert)
   *  Rückgabe: keine
   **/
  refreshPage() {
    this.ionViewWillEnter();
  }

  /* ---- Für spätere Versionen ---- */

  // Die Varible soll zur Speicherung der akt. Sprache eingesetzt werden
  // selectedLanguage: string;

  /**
    * 
    *  Funktion: Funktion zum Ändern der Spachen in der App.
    *             Feature ist voll funktionsfähig, wird aber in der aktuellen 
    *             Version der App nicht eingesetzt.
    **/
  /*languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }*/

}

