import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { FolderPageRoutingModule } from './folder-routing.module';

import { ListjobComponent } from './listjob.component';
import { FolderPageRoutingModule } from 'src/app/folder/folder-routing.module';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  declarations: [ListjobComponent]
})
export class ListjobModule {}
