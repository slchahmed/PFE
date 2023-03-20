import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetiosDutulisateursPageRoutingModule } from './getios-dutulisateurs-routing.module';

import { GetiosDutulisateursPage } from './getios-dutulisateurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetiosDutulisateursPageRoutingModule
  ],
  declarations: [GetiosDutulisateursPage]
})
export class GetiosDutulisateursPageModule {}
