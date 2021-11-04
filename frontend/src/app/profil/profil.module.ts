import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ProfilPage } from './profil.page';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';


const routes: Routes = [
  {
    path: '',
    component: ProfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
    TranslateModule.forChild()
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
