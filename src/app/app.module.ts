import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule, ControlContainer } from '@angular/forms';
import { PagerService } from './services/common/pager.service';
import { DateformatService } from './services/dateformat/dateformat.service';
import { FolderPageModule } from './folder/folder.module';
import { ListjobModule } from './pages/listjob/listjob.module';
import { JobdetailsModule } from './pages/jobdetails/jobdetails.module';
import { PostjobService } from './services/firebase/postjob/postjob.service';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplyjobModule } from './pages/jobdetails/applyjob/applyjob.module';
import { ApplyjobService } from './services/firebase/applyjob/applyjob.service';
import { EmailService } from './services/email/email.service';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutbModule } from './pages/about/about.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FolderPageModule,
    ListjobModule,
    JobdetailsModule,
    ApplyjobModule,
    AngularFireDatabaseModule,
    AboutbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [
    StatusBar,
    AngularFirestore,
    AngularFireDatabase,
    PagerService,
    DateformatService,
    SplashScreen,
    PostjobService,
    ApplyjobService,
    EmailService,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
