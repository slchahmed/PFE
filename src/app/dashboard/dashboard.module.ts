import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgxDatatableModule,
    NgxPaginationModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
