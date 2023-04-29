import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoProjetPage } from './info-projet.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProjetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProjetPageRoutingModule {}
