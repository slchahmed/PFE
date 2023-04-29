import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProjetPageRoutingModule } from './info-projet-routing.module';

import { InfoProjetPage } from './info-projet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProjetPageRoutingModule
  ],
  declarations: [InfoProjetPage]
})
export class InfoProjetPageModule {}
