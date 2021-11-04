import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //Ionic DevApp Tets
  //API_URL = 'http://192.168.2.111/backend_aktuell/public/';

  // Rechner Test
  API_URL = 'http://localhost/backend_aktuell/public/';
  
  API_CLIENT_SECRET = 'HeIom1b85qI2i15h63Rn1hCzMWOHXSDcISoD9Imq';

  constructor() { }
}
