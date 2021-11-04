import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  
  // , canActivate: [AuthGuard] } zum benuzten von AuthGuard 

  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'einstellungen', loadChildren: './einstellungen/einstellungen.module#EinstellungenPageModule' },
  //{ path: 'profil-bearbeiten', loadChildren: './pages/profil-bearbeiten/profil-bearbeiten.module#ProfilBearbeitenPageModule' },
  //{ path: 'add-day', loadChildren: './pages/add-day/add-day.module#AddDayPageModule' },
  //{ path: 'stundenplan', loadChildren: './stundenplan/stundenplan.module#StundenplanPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}