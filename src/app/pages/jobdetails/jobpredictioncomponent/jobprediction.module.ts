import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlContainer } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPageRoutingModule } from 'src/app/folder/folder-routing.module';
import { JobpredictioncomponentComponent } from './jobpredictioncomponent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [JobpredictioncomponentComponent]
})
export class JobpredictionModule {}