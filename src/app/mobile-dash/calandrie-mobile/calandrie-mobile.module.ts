import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalandrieMobilePageRoutingModule } from './calandrie-mobile-routing.module';

import { CalandrieMobilePage } from './calandrie-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalandrieMobilePageRoutingModule
  ],
  declarations: [CalandrieMobilePage]
})
export class CalandrieMobilePageModule {}
