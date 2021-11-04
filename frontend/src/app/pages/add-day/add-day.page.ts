
/******************************************************************
***** Name: add-day.page.ts
***** Ver.: 0.1
***** Date: 12.01.2020
***** Auth: Maxim Zitnikowski, Mathias Hölz
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: 
******************************************************************/

// Imports werden alphabetisch sortiert
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../../models/user';
import { WorkhoursService } from './../../services/workhours.service';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.page.html',
  styleUrls: ['./add-day.page.scss'],
})
export class AddDayPage implements OnInit {

  /* ---- Variablen Block ---- */

  @Input() id: any;
  @Input() day: any;
  @Input() start: any;
  @Input() break: any;
  @Input() end: any;
  @Input() driven: any;

  // User aus der Datenbank
  user: User;

  /* ---- Konstruktor Block ---- */

  constructor(
    private modalController: ModalController,
    private workhoursService: WorkhoursService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user().subscribe(user => {
      this.user = user;
    });
  }

  /* ---- Funktionen Block ---- */

  /**
    *  Funktion: Fügt einen neuen Eintrag in der Datenbank hinzu, 
    *             und schließt anschließend das PopUp 
    *  Rückgabe: keine
    **/
  addEntry() {
    this.workhoursService.insertEntry(this.user.id, this.day, this.start, this.end, this.break, this.driven)
      .subscribe(
        error => {
          console.log(error);
        }
      );
    // Das Pop-up schließen
    this.dismissPopUp();
  }

  /**
    *  Funktion: Schließen des PopUps. Alle Eingaben werden verworfen. 
    *  Rückgabe: keine
    **/
  dismissPopUp() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
