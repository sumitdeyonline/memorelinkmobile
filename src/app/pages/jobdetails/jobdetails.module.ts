import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPageRoutingModule } from 'src/app/folder/folder-routing.module';
import { JobdetailsComponent } from './jobdetails.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [JobdetailsComponent]
})
export class JobdetailsModule {}
