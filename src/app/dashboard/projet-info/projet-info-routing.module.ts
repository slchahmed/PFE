import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetInfoPage } from './projet-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProjetInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetInfoPageRoutingModule {}
