import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsDesUtilisateursPage } from './lists-des-utilisateurs.page';

const routes: Routes = [
  {
    path: '',
    component: ListsDesUtilisateursPage
  },
  {
    path: 'getios-dutulisateurs',
    loadChildren: () => import('../getios-dutulisateurs/getios-dutulisateurs.module').then( m => m.GetiosDutulisateursPageModule),

  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsDesUtilisateursPageRoutingModule {}
