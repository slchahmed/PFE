import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileDashPage } from './mobile-dash.page';

const routes: Routes = [
  {
    path: '',
    component: MobileDashPage,
    children:[
      {
        path: 'dash',
        loadChildren: () => import('./dash/dash.module').then( m => m.DashPageModule)
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then( m => m.StatusPageModule)
      },
      {
        path: 'calandrie-mobile',
        loadChildren: () => import('./calandrie-mobile/calandrie-mobile.module').then( m => m.CalandrieMobilePageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('../projet-info-mobile/projet-info-mobile.module').then( m => m.ProjetInfoMobilePageModule)
      },
    ]
  },
  {
    path:'',
    redirectTo:'/mobile-dash/dash',
    pathMatch:'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileDashPageRoutingModule {}
