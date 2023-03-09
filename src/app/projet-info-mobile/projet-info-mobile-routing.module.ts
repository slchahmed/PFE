import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetInfoMobilePage } from './projet-info-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: ProjetInfoMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetInfoMobilePageRoutingModule {}
