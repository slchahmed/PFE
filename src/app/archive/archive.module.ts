import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from '@ionic/angular';

import { ArchivePageRoutingModule } from './archive-routing.module';

import { ArchivePage } from './archive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivePageRoutingModule,
    NgxDatatableModule,
    NgxPaginationModule
  ],
  declarations: [ArchivePage]
})
export class ArchivePageModule {}
