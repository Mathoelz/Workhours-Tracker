
/******************************************************************
***** Name: app.module.ts
***** Ver.: 0.1
***** Date: 12.01.2020
***** Auth: Maxim Zitnikowski
***** HS Osnabrueck
***** University of Applied Sciences
***** Germany
***** Funktionalität: 
***** History: keine
***** ToDo: 
******************************************************************/

import { FormsModule } from '@angular/forms';
import { EditDayPage } from './pages/edit-day/edit-day.page';
import { AddDayPage } from './pages/add-day/add-day.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Crop } from '@ionic-native/crop/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

@NgModule({
  declarations: [AppComponent, EditDayPage, AddDayPage],
  entryComponents: [EditDayPage, AddDayPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
    StatusBar,
    File,
    SplashScreen,
    Camera,
    Crop,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    DeviceMotion,
    ModalController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}