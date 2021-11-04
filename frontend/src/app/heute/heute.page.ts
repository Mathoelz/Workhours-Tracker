
/******************************************************************
***** Name: heute.page.ts
***** Ver.: 0.3
***** Date: 31.12.2019
***** Auth: Maxim Zitnikowski, Mathias Hölz
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: In der 'HeutePage' Klasse ist viel CodeDuplizierung. Dieses Problem soll
              in der Zukunft behoben werden. Allerdings wie es gemacht wird,
              ist eine gute Frage
******************************************************************/

// Imports werden alphabetisch sortiert
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { User } from '../models/user';
import { WorkhoursService } from './../services/workhours.service';

@Component({
  selector: 'app-heute',
  templateUrl: './heute.page.html',
  styleUrls: ['./heute.page.scss'],
})
export class HeutePage implements OnInit {

  /* ---- Variablen Block ---- */

  // User aus der Datenbank
  user: User;
  // Die Variable wird als Anzeige des heutigen Tages angezeigt
  public today = new Date().toLocaleString().split(',', 1).join(' ');
  // Die Variable speichert den aktuellen Arbaitstag
  todayIsExists: Day

  /* ---- Konstruktor Block ---- */

  constructor(
    private workhoursService: WorkhoursService,
    private authService: AuthService
  ) { }

  /* ---- Eigentlichen Funktionen ---- */

  ionViewWillEnter() {
    // Aktuellen Nutzer auslesen
    this.authService.user().subscribe(user => {
      this.user = user;
      // Den heutigen tag initialisiert
      this.todayFunction();
    });
  }

  ngOnInit(): void { }

  /**
  * 
  *  Funktion: Die Funktion liest aus der Datenbank (falls vorhanden)
  *             den aktuellen Tag aus und initialisiert diesen.
  *  Rückgabe: keine
  */
  todayFunction() {
    // heutigen Tag instanziieren
    var current = new Date().toISOString();
    this.workhoursService.getToday(current).subscribe(result => {
      if (result != null) {
        // falls result nur einen Eintrag zurckliefert
        if (Object.keys(result).length == 1) {
          // initialisiere die Variable 'todayIsExists'
          this.todayIsExists = new Day(result[0].id)
          this.todayIsExists.day = result[0].day
          this.todayIsExists.start = result[0].start
          this.todayIsExists.end = result[0].end
          this.todayIsExists.break = result[0].break
          this.todayIsExists.driven = result[0].driven
          this.todayIsExists.hours = result[0].hours
          //console.log(this.todayIsExists)
        }
      }
    });
  }

  /**
  * 
  *  Funktion: Die Funktion fügt in der Datenbank einen Neuen eintrag
  *             für den heutigen Tag hinzu. Anschließend wird die Seite
  *             neugeladen.
  *  Rückgabe: keine
  */
  eintragHinzufuegen() {
    this.workhoursService.insertEmptyEntry(this.user.id).subscribe(result => {
      console.log(result);
    });
    // die Seite neuladen
    this.refreshPage();
  }

  /**
  * 
  *  Funktion: Die Funktion aktualisiert in der Datenbank die Zelle 'start'
  *             von dem heutigen Tag. Anschließend wird die Seite
  *             neugeladen.
  * iNFO: CodeDuplizierung sein Vater
  */
  updateStartTime($event) {
    var startTime = $event.substring(11, 16)
    this.workhoursService.updateStartTime(this.user.id, this.todayIsExists.id, startTime).subscribe(result => {
      console.log(result);
    });
  }

  /**
  * 
  *  Funktion: Die Funktion aktualisiert in der Datenbank die Zelle 'break'
  *             von dem heutigen Tag. Anschließend wird die Seite
  *             neugeladen.
  * iNFO: CodeDuplizierung sein Vater
  */
  updateBreakTime($event) {
    var breakTime = $event.substring(11, 16);
    this.workhoursService.updateBreakTime(this.user.id, this.todayIsExists.id, breakTime).subscribe(result => {
      console.log(result);
    });
  }

  /**
  * 
  *  Funktion: Die Funktion aktualisiert in der Datenbank die Zelle 'end'
  *             von dem heutigen Tag. Anschließend wird die Seite
  *             neugeladen.
  * iNFO: CodeDuplizierung sein Vater
  */
  updateEndTime($event) {
    var endTime = $event.substring(11, 16)
    this.workhoursService.updateEndTime(this.user.id, this.todayIsExists.id, endTime).subscribe(result => {
      console.log(result);
    });
  }

  /**
  * 
  *  Funktion: Die Funktion aktualisiert in der Datenbank die Zelle 'end'
  *             von dem heutigen Tag. Anschließend wird die Seite
  *             neugeladen.
  * iNFO: CodeDuplizierung sein Vater
  */
  updateDrivenTime($event) {
    var drivenTime = $event.substring(11, 16)
    this.workhoursService.updateDrivenTime(this.user.id, this.todayIsExists.id, drivenTime).subscribe(result => {
      console.log(result);
    });
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

}
