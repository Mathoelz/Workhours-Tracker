
/******************************************************************
***** Name: profil.page.ts
***** Ver.: 0.2
***** Date: 30.11.2019
***** Auth: Maxim Zitnikowski, Mathias Hölz
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: 
******************************************************************/

export class User {
    id: number;
    name: string;
    email: string;

    // (Stunden bis jetzt bearbeitet)
    //  --> Arbeitsstunden des Users im aktuellen Monat
    workingHoursTillNow: number;  
    // (Tage bis jetzt bearbeitet)  
    //  --> Arbeitsstage des Users im aktuellen Monat
    workingDaysTillNow: number;
    // (Zielstunden)                
    //  --> Gewüschten Stunden, die der User auf der Arbeit verbringen möchte 
    monthTarget: number; 
    // Stundenlohn des Users       
    //  --> Somit Kann der User seinen Stundenlohn für weitere Brechnungen verwenden
    hourlyWage:number;
    // (Bis jetzt verdient (Brutto))
    //  --> Der User kann seinen voraussichtlichen Verdients einsehen 
    grossSalary: number;


    
    semestercount: number;
    studysubject: number;
    degree: string;

    
}