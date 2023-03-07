import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./projet-info/projet-info.module').then( m => m.ProjetInfoPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'calandrie',
    loadChildren: () => import('./calandrie/calandrie.module').then( m => m.CalandriePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
