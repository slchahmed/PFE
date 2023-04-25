import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDatePageRoutingModule } from './list-date-routing.module';

import { ListDatePage } from './list-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDatePageRoutingModule
  ],
  declarations: [ListDatePage]
})
export class ListDatePageModule {}
