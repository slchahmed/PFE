import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDatePage } from './list-date.page';

const routes: Routes = [
  {
    path: '',
    component: ListDatePage
  },

    {
      path: ':id',
      loadChildren: () => import('../projet-info/projet-info.module').then( m => m.ProjetInfoPageModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDatePageRoutingModule {}
