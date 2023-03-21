import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { IonicModule } from '@ionic/angular';

import { ListsDesUtilisateursPageRoutingModule } from './lists-des-utilisateurs-routing.module';

import { ListsDesUtilisateursPage } from './lists-des-utilisateurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsDesUtilisateursPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ListsDesUtilisateursPage]
})
export class ListsDesUtilisateursPageModule {}
