import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjetInfoPageRoutingModule } from './projet-info-routing.module';

import { ProjetInfoPage } from './projet-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjetInfoPageRoutingModule
  ],
  declarations: [ProjetInfoPage]
})
export class ProjetInfoPageModule {}
