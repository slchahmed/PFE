import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjetInfoMobilePageRoutingModule } from './projet-info-mobile-routing.module';

import { ProjetInfoMobilePage } from './projet-info-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjetInfoMobilePageRoutingModule
  ],
  declarations: [ProjetInfoMobilePage]
})
export class ProjetInfoMobilePageModule {}
