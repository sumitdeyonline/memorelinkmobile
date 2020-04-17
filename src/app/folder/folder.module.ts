import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTypeaheadModule } from 'ngx-typeahead';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgbTypeaheadModule,
    NgxTypeaheadModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
