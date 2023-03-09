import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalandrieMobilePage } from './calandrie-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: CalandrieMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalandrieMobilePageRoutingModule {}
