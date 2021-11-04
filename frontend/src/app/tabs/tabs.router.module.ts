import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'heute',
        children: [
          {
            path: '',
            loadChildren: '../heute/heute.module#HeutePageModule'
          }
        ]
      },
      {
        path: 'stundenplan',
        children: [
          {
            path: '',
            loadChildren: '../stundenplan/stundenplan.module#StundenplanPageModule'
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: '../profil/profil.module#ProfilPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/heute',
        pathMatch: 'full'
      }
    ]
  },
  { /* -- Der Tab, der standardmäßig geöffnet wird -- */
    path: '',
    redirectTo: 'tabs/heute',
    pathMatch: 'full'
  } /* -- */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
