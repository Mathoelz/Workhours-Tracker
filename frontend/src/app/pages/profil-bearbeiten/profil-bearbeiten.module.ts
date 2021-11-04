import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilBearbeitenPage } from './profil-bearbeiten.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilBearbeitenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilBearbeitenPage]
})
export class ProfilBearbeitenPageModule {}
