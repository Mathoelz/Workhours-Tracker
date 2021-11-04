
/******************************************************************
***** Name: einstellungen.page.ts
***** Ver.: 0.2
***** Date: 02.01.2020
***** Auth: Maxim Zitnikowski
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: 
******************************************************************/

// Imports werden alphabetisch sortiert
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.page.html',
  styleUrls: ['./einstellungen.page.scss'],
})
export class EinstellungenPage implements OnInit {

  /* ---- Variablen Block ---- */

  // User aus der Datenbank
  user: User;
  // ProfilBild
  profileImage = 'assets/img/no-avatar-found.png'

  /* ---- Konstruktor Block ---- */

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() { }

  /*
  constructor 
    --> ionViewDidLoad 
    --> ionViewWillEnter 
    --> ionViewDidEnter 
    --> ionViewWillLeave 
    --> ionViewDidLeave 
    --> ionViewWillUnload
  So never put heavy synchronous code into ionViewWillEnter. 
  Just use asynchronous in ionViewWillEnter and move all synchronous code to ionViewDidEnte
  */
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      });
  }

  /**
    * 
    *  Funktion: Zeigt ein AllertController "Logout" an.
    *  Rückgabe: keine
    */
  async logOutAlert() {
    const alert = await this.alertController.create({
      header: 'Sind Sie sicher?',
      message: 'Sie werden aus Ihrem Account ausgelogt',
      buttons: [
        {
          text: 'abbrechen',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'bestätigen',
          handler: () => {
            this.logOut();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
  * 
  *  Funktion: Zeigt ein AllertController "Delete Account" an.
  *  Rückgabe: keine
  */
  async deleteUserAlert() {
    const alert = await this.alertController.create({
      header: 'Sind Sie sicher?',
      message: 'Wir werden Ihren Account entgültig löschen',
      buttons: [
        {
          text: 'abbrechen',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'bestätigen',
          handler: () => {
            this.deleteUser();
          }
        }
      ]
    });
    await alert.present();
  }

  /* ---- Rest API ---- */

  /**
    * 
    *  Funktion: Die Funktion zum Auslogen des Users
    *  Rückgabe: keine
    */
  logOut() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navController.navigateRoot('/landing');
      }
    )
  }

  /**
    * 
    *  Funktion: Die Funktion zum Löschen des Users aus der Datenbank
    *  Rückgabe: keine
    */
  deleteUser() {
    this.authService.delete().subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navController.navigateRoot('/landing');
      }
    )
  }


  /* ---- Für spätere Versionen ---- */

  /* ---- Variablen Block ---- */
  // Spachen die zur Auswahl stehen
  // languages = ['Deutsch'];
  // Benachrichtigungen 
  // enableNotifications = true;

  /* ---- Funtkionen Block ---- */
  /*toggleNotifications() {
    if (this.enableNotifications) {
      //this.toastCtrl.create('Notifications enabled.');
    } else {
      //this.toastCtrl.create('Notifications disabled.');
    }
  }*/

}



