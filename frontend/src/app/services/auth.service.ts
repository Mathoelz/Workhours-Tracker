import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'oauth/token',
      {username: email, password: password, grant_type:'password', client_id:2, client_secret:this.env.API_CLIENT_SECRET, scope:''}
    ).pipe(
      tap(access_token => {

        window.localStorage.setItem('token', ''+JSON.stringify(access_token));
        /*this.storage.setItem('token', access_token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );*/

        this.token = access_token;
        this.isLoggedIn = true;
        return access_token;
      }),
    );
  }

  register(name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'api/auth/register',
      {name: name, email: email, password: password}
    )
  }

  update(dataset): Observable<User> {

    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    })
    
    return this.http.put<User>(this.env.API_URL + 'api/auth/update', dataset, { headers: headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /*------------------------------*/

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get(this.env.API_URL + 'api/auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  delete() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http.get(this.env.API_URL + 'api/auth/delete', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  user()  {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get<User>(this.env.API_URL + 'api/auth/user', { headers: headers})
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  test() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    this.http.get(this.env.API_URL + 'api/auth/test', { headers: headers}).toPromise()
    .then(
      res => { // Success
        console.log(res);
      }
    );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

}
