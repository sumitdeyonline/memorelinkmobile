import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

// import { CallbackComponent } from './callback';
// import { CommondialogComponent } from './commondialog';
// import { LogComponent } from './logger';
// import { NotfoundComponent } from './notfound';
import { MatDialogModule } from '@angular/material/dialog';
//import { MdToHtmlCommonPipe } from './pipe';
import { AngularUtilityComponent } from './angular-utility';
import { CommondialogComponent } from './commondialog';
import { CallbackComponent } from './callback';
import { LogComponent } from './logger';
import { NotfoundComponent } from './notfound';
import { MdToHtmlCommonPipe } from './pipe';
//import { CommondialogComponent, CallbackComponent, LogComponent, NotfoundComponent, MdToHtmlCommonPipe } from '.';

@NgModule({
    imports: [
      CommonModule,
    //   ReactiveFormsModule,
      RouterModule,
      MatDialogModule
    ],
    entryComponents: [ CommondialogComponent],
    declarations: [ CallbackComponent,CommondialogComponent,LogComponent,NotfoundComponent, MdToHtmlCommonPipe, AngularUtilityComponent, AngularUtilityComponent ],
    exports: [
      CommonModule,
    //   ReactiveFormsModule,
      RouterModule,
      MatDialogModule,
      CallbackComponent,
      CommondialogComponent,
      MdToHtmlCommonPipe,
      LogComponent,
      NotfoundComponent,
      AngularUtilityComponent
    ],  providers: [

    ]
  })
  export class CommonProjectModule {
  }