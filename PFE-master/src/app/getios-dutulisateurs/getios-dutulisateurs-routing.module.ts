import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetiosDutulisateursPage } from './getios-dutulisateurs.page';

const routes: Routes = [
  {
    path: '',
    component: GetiosDutulisateursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetiosDutulisateursPageRoutingModule {}
