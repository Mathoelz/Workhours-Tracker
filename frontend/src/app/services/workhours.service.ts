
/******************************************************************
***** Name: workhours.service.ts
***** Ver.: 0.1
***** Date: 12.01.2020
***** Auth: Maxim Zitnikowski
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: Funktionen insert und update beinhalten das selbe, deswegen zusammenschmeissen
******************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkhoursService {
  
  //Ionic DevApp Tets
  API_URL = 'http://192.168.2.111/backend_aktuell/public/api/workhours/';

  //API_URL = 'http://localhost/backend_aktuell/public/api/workhours/'

  constructor(
    private http: HttpClient,
  ) { }

  /**
  *  Funktion: Fügt einen neuen Eintrag in der Datenbank hinzu.
  */
  public insertEntry(userId, day, start, end, rest, driven) {
    return this.http.post(this.API_URL + "insert", { userId, day, start, end, rest, driven })
      .pipe(

      )
  }

  /**
  *  Funktion: Aktualisiert einen neuen Eintrag in der Datenbank.
  */
  public updateEntry(userId, id, day, start, end, rest, driven) {
    return this.http.post(this.API_URL + "update", { userId, id, day, start, end, rest, driven })
      .pipe(

      )
  }

  /**
  *  Funktion: Löscht einen neuen Eintrag aus der Datenbank.
  */
  public deleteDay(userId, dayId) {
    return this.http.post(this.API_URL + "delete", { userId, dayId })
      .pipe(

      )
  }

  public getMonth(month) {
    return this.http.post(this.API_URL + "month", { month })
      .pipe(

      )
  }

  // Die funktion wird in heute.page benutzt um die Stunden des Aktuelen tages zu bekommen
  public getToday(month) {
    return this.http.post(this.API_URL + "month2", { month })
      .pipe(

      )
  }

  /**
    * 
    *  Funktion: Die Funktion schickt an die BackEndFunktion 'insertEmptyEntry()' 
    *               eine 'user_id', damit ein leerer Eintrag mit einer User-Zuweisung 
    *               erzeugt werden kann
    **/
  public insertEmptyEntry(user_id) {
    return this.http.post(this.API_URL + "insertEmptyEntry", { user_id })
      .pipe(

      )
  }

  public updateStartTime(user_id, id, start) {
    return this.http.post(this.API_URL + "updateStartTime", { user_id, id, start })
      .pipe(

      )
  }

  public updateBreakTime(user_id, id, breakTime) {
    return this.http.post(this.API_URL + "updateBreakTime", { user_id, id, breakTime })
      .pipe(

      )
  }

  public updateEndTime(user_id, id, end) {
    return this.http.post(this.API_URL + "updateEndTime", { user_id, id, end })
      .pipe(

      )
  }

  public updateDrivenTime(user_id, id, driven) {
    return this.http.post(this.API_URL + "updateDrivenTime", { user_id, id, driven })
      .pipe(

      )
  }
}
