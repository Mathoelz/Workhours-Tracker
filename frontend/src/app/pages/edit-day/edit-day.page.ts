
/******************************************************************
***** Name: edit-day.page.ts
***** Ver.: 0.2
***** Date: 02.01.2020
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
  selector: 'app-edit-day',
  templateUrl: './edit-day.page.html',
  styleUrls: ['./edit-day.page.scss'],
})
export class EditDayPage implements OnInit {

  @Input() id: any;
  @Input() day: any;
  @Input() start: any;
  @Input() break: any;
  @Input() end: any;
  @Input() driven: any;

  // User aus der Datenbank
  user: User;

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

  /**
    *  Funktion: Aktualisiert den bestimmten Eintrag in der Datenbank, 
    *             und schließt anschließend das PopUp 
    *  Rückgabe: keine
    **/
  updateWorkhours() {
    this.workhoursService.updateEntry(this.user.id, this.id, this.day, this.start, this.end, this.break, this.driven)
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
