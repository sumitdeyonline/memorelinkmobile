import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FileUpload } from './fileupload';
import { UploadResume } from './uploadresume.model';
import * as firebase from 'firebase/app';
import 'firebase/storage';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//import { PostJobc } from './postjob.model';
//import { FIREBASE_CONFIG } from '../../global-config';
import { formatDate } from '@angular/common';
//import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';



//import { SEARCH_CONFIG } from '../../global-config';


@Injectable({
  providedIn: 'root'
})
export class UploadResumeService {

  selectedUploadResume: UploadResume;
  urCollection: AngularFirestoreCollection <UploadResume>;
  UploadResumec: Observable<UploadResume[]>;
  upDoc: AngularFirestoreDocument<UploadResume>;

  uploadResume: Array<UploadResume> = [];

  private basePath = FIREBASE_CONFIG.UploadPath; //'/uploads';
  private tempResumePath = FIREBASE_CONFIG.TempResume; //'/uploads';
  private task: any;
  downloadURL: any;
  downloadURLTempResume: any;
  fileName: any;
  fUpload: FileUpload;


  constructor(private db: AngularFireDatabase, private afs : AngularFirestore) {
    this.urCollection = this.afs.collection(FIREBASE_CONFIG.UploadResume);
  }


  pushTempResumeStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    this.task =  storageRef.child(`${this.tempResumePath}/${"Resume_"+Math.random()+fileUpload.file.name}`).put(fileUpload.file);

    this.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

      },
      (error) => {
        // fail
        //console.log(error);
      },
      () => {
        this.task.snapshot.ref.getDownloadURL().then(downloadURL => {
          //console.log('File available at', downloadURL);
          this.downloadURLTempResume = downloadURL;
          //console.log('File Key::::::::: => ', fileUpload.key);
          // fileUpload.url = downloadURL;
          // fileUpload.name = fileUpload.file.name;
        });
      }
    );


  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }, id: string) {


    const storageRef = firebase.storage().ref();

    // if (this.auth.userProfile == null) {
      //console.log('Null -> File Name ', "Generic_"+fileUpload.file.name);
      this.task =  storageRef.child(`${this.basePath}/${"Generic_"+fileUpload.file.name.replace(".","_")}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    // }
    // else {
    //   let filename = this.auth.userProfile.name+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1);
    //   //console.log('Not Null -> File Name ', this.auth.userProfile.name.replace(".","_")+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1));
    //  // console.log('Not Null -> File Name '+filename);

    //   //this.task = storageRef.child(`${this.basePath}/${this.auth.userProfile.name+"_"+fileUpload.file.name}`).put(fileUpload.file);
    //   this.task = storageRef.child(`${this.basePath}/${filename}`).put(fileUpload.file);
    //   //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    // }

    //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    const uploadTask = this.task;

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

      },
      (error) => {
        // fail
        //console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {

          //console.log('File available at', downloadURL);
          //console.log('File Key::::::::: => ', fileUpload.key);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;


          this.downloadURL = downloadURL;
          this.fileName =  fileUpload.file.name;
          //this.fUpload.name = fileUpload.file.name;
          //this.fUpload.url = downloadURL;

          this.saveFileData(fileUpload);
          let uResume = {} as UploadResume;
          uResume.ResumeFileName = this.fileName;
          // uResume.UserID =  this.auth.userProfile.name;
          // uResume.Username =  this.auth.userProfile.name;
          uResume.ResumeURL =  this.downloadURL;
          uResume.ResumeID =  "";
          uResume.ResumeExt =  this.fileName.substring(this.fileName.lastIndexOf(".")+1,this.fileName.length);
          if (id == null) {
            //console.log("It's a new upload");

            uResume.CreatedDate =  formatDate(new Date(), 'MM/dd/yyyy', 'en');
            //this.selectedUploadResume = new uploadResume[];
            // this.uploadResume.ResumeFileName  =   this.fileName;
            // this.selectedUploadResume.ResumeURL  =   this.downloadURL;
            // console.log("It's a new upload -- Download URL ::: "+uResume.ResumeURL);
            // console.log("It's a new upload -- Download URL ::: "+uResume.ResumeFileName);
            // console.log("It's a new upload -- Download URL ::: "+uResume.ResumeExt);
            // console.log("It's a new upload -- Download URL ::: "+uResume.CreatedDate);
            // this.selectedUploadResume.ResumeExt = this.fileName.substring(this.fileName.lastIndexOf(".")+1,this.fileName.length);
            // this.selectedUploadResume.ModifiedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');

          } else {
            //console.log("It's a update >>><<<< "+id);
            uResume.ModifiedDate =  formatDate(new Date(), 'MM/dd/yyyy', 'en');
          }
          this.addUpdateUserResume(uResume, id);
          this.selectedUploadResume = uResume;
          //console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.selectedUploadResume.id);
          // this.selectedUploadResume.ResumeFileName  =   this.fileName;
          // this.selectedUploadResume.ResumeURL  =   this.downloadURL;
          // this.selectedUploadResume.ResumeExt = this.fileName.substring(this.fileName.lastIndexOf(".")+1,this.fileName.length);
          // this.selectedUploadResume.ModifiedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
          // this.addUpdateUserResume(this.selectedUploadResume, this.selectedUploadResume.id);

        });

      }

    );

  }

  private saveFileData(fileUpload: FileUpload) {

    this.db.list(`${this.basePath}/`).push(fileUpload);

  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>

      //ref.key(numberItems));
      ref.limitToLast(numberItems));
    }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }


  getResumeDetails(user) {
    //console.log("Resume Details "+user);


    this.urCollection = this.afs.collection(FIREBASE_CONFIG.UploadResume, ref =>
          ref.where('Username','==',user));
          //console.log("List Service ..... 4");
    this.UploadResumec = this.urCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UploadResume;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.UploadResumec;
  }

  addUpdateUserResume(uResume: UploadResume, id: string) {

    //console.log("New Form ::: ------------->" + id);
    if ((id == null) || (id == '')) {
      uResume.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      // uResume.Username = this.auth.userProfile.name;
      // uResume.UserID = this.auth.userProfile.name;
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      this.urCollection.add(uResume);
    } else {
      //console.log("UPDATE FORM ...." + id);
      //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);


      this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.UploadResume}/${id}`);
      this.upDoc.update(uResume);
    }
    //this.AlgoliaUpdate();
  }


}
