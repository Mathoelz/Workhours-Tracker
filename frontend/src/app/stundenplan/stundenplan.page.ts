
/******************************************************************
***** Name: stundenplan.page.ts
***** Ver.: 0.2
***** Date: 01.12.2019
***** Auth: Mathias Hölz, Maxim Zitnikowski
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: Die Variable 'day' zu 'date' umbenennen, da die Funktionalität die 
              ursprünglich dahinter gehangen hat, verändert wurde
******************************************************************/

import { WorkhoursService } from './../services/workhours.service';
import { AddDayPage } from './../pages/add-day/add-day.page';
import { EditDayPage } from './../pages/edit-day/edit-day.page';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Day } from '../models/day';

@Component({
  selector: 'app-stundenplan',
  templateUrl: './stundenplan.page.html',
  styleUrls: ['./stundenplan.page.scss'],
})
export class StundenplanPage implements OnInit {

  user: User;
  month: Day[] = [];
  current = new Date().toISOString();
  data: any = [];

  constructor(
    public alertController: AlertController,
    public alertService: AlertService,
    private authService: AuthService,
    private mod: ModalController,
    private workhoursService: WorkhoursService,
    private _router: Router,
  ) { }

  ionViewWillEnter() {
    this.authService.user().subscribe(user => {
      this.user = user;
      this.getWorkingDaysTillNow();
    });
  }

  ngOnInit(): void { }

  daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getWorkingDaysTillNow() {
    this.month = [];
    this.workhoursService.getMonth(this.current).subscribe(result => {
      if (result != null) {
        this.data = result;
        //console.log(this.data)
        for (let item of this.data) {
          var temp = new Day(0);
          temp.id = item.id;
          temp.day = item.day;
          temp.start = item.start;
          temp.end = item.end;
          temp.break = item.break;
          temp.driven = item.driven;
          temp.hours = item.hours;
          this.month.push(temp);
        }
      }
    });
  }

  /**
   * 
   *  Funktion: Zeigt ein AllertController "Present Info" an. 
   *              Der User kann darinnen Informationen zu dem jeweiligen Arbeitstag sehen.
   *  Rückgabe: keine
   **/
  async presentInfoAlert(day: Day) {
    const alert = await this.alertController.create({
      // Datum String (z.B. 2019-12-15 00:00:00) soll ab der erstellen Stelle ' ' tegrimt werden.
      // als Variable 'day.date' wird erwartet '2019-12-15'
      header: 'Datum: ' + day.day.split(' ', 1).join(' ') ,
      subHeader: 'Informationen zum Arbeitstag',
      message: '<strong>Anfangszet: </strong>' + day.start + '<br>' +
        '<strong>Pausenzeit: </strong>' + day.break + '<br>' +
        '<strong>Endzeit:    </strong>' + day.end + '<br>' +
        '<strong>Fahrzeit:   &nbsp</strong>' + day.driven,
      buttons: [
        {
          text: 'löschen',
          cssClass: 'secondary',
          handler: () => {
            this.confirmDelete(day);
          }
        },
        {
          text: 'bearbeiten',
          cssClass: 'secondary',
          handler: () => {
            this.editDay(day);
            this.refreshPage();
          }
        }, {
          text: 'OK',
          handler: () => {
            //console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  /**
  * 
  *  Funktion: Zeigt eine neue Seite an. 
  *              Der User kann in der Page einen neuen Arbeitstag anlegen
  *  Rückgabe: await modal.present()
  */
  async addEntry() {
    const modal: HTMLIonModalElement =
      await this.mod.create({
        component: AddDayPage,
        componentProps: {
        }
      });

    modal.onWillDismiss().then(data => {
      //this.getWorkingDaysTillNow();
      // die Seite neuladen
      this.refreshPage();
    });
    return await modal.present();
  }

  /**
  * 
  *  Funktion: Zeigt eine neue Seite an. 
  *              Der User kann darinnen Informationen zu dem jeweiligen Arbeitstag bearbeiten.
  *  Rückgabe: await modal.present()
  **/
  async editDay(day: Day) {
    const modal: HTMLIonModalElement =
      await this.mod.create({
        component: EditDayPage,
        componentProps: {
          'id': day.id,
          'day': day.day,
          'start': day.start,
          'rest': day.break,
          'end': day.end,
          'drive': day.driven
        }
      });

    modal.onWillDismiss().then(data => {
      //this.getWorkingDaysTillNow();
      // die Seite neuladen
      this.refreshPage();
    });
    return await modal.present();
  }

  /**
  * 
  *  Funktion: Alert fragt den User, ob dieser den Eintrag wirklich löschen möchte. 
  *  Rückgabe: await alert.present()
  **/
 async confirmDelete(day) {
  const alert = await this.alertController.create({
    header: 'Eintrag löschen?',
    message: 'Der Eintrag zum ' + '<strong>' + day.day + '</strong> wird gelöscht, fortfahren?',
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'Ok',
        handler: () => {
          this.deleteDay(day);
        }
      }
    ]
  });
  await alert.present();
}

  /**
  * 
  *  Funktion: Der Funktion wird ein Tag übergeben, 
  *               welcher anschließend gelöscht werden soll
  **/
  deleteDay(day) {
    this.workhoursService.deleteDay(this.user.id, day.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        // die Seite neuladen
        this.refreshPage();
      }
    )
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

  /**
   * 
   *  Funktion: 
   *  Rückgabe: 
   **/
  evolution(n) {
    return n > 0
      ? '<span>' + parseFloat(n).toFixed(2) + '&nbsp;<i class="fa fa-caret-up"></i></span>'
      : '<span class="red">' + parseFloat(n).toFixed(2) + '&nbsp;<i class="fa fa-caret-down"></i></span>';
  }
}







