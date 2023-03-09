import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileDashPageRoutingModule } from './mobile-dash-routing.module';

import { MobileDashPage } from './mobile-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileDashPageRoutingModule
  ],
  declarations: [MobileDashPage]
})
export class MobileDashPageModule {}
