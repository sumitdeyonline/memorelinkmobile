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
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { UserProfile } from '../userprofile/userprofile.model';
import { UserprofileService } from '../userprofile/userprofile.service';



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
  uResume: UploadResume[];

  private basePath = FIREBASE_CONFIG.UploadPath; //'/uploads';
  private tempResumePath = FIREBASE_CONFIG.TempResume; //'/uploads';
  private task: any;
  downloadURL: any;
  downloadURLTempResume: any;
  fileName: any;
  fUpload: FileUpload;


  constructor(private db: AngularFireDatabase, private afs : AngularFirestore, private auth: AuthService, public uProfileservice: UserprofileService) {
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

    if (this.auth.userProfile == null) {
      //console.log('Null -> File Name ', "Generic_"+fileUpload.file.name);
      this.task =  storageRef.child(`${this.basePath}/${"Generic_"+fileUpload.file.name.replace(".","_")}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    }
    else {
      let filename = fileUpload.file.name.substring(0,fileUpload.file.name.lastIndexOf("."))+"__"+this.auth.userProfile.name+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1);

      //let fname = fileUpload.file.name.substring(0,fileUpload.file.name.lastIndexOf("."));
      //console.log('Not Null -> File Name ', this.auth.userProfile.name.replace(".","_")+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1));
      //console.log('Not Null -> File Name '+filename);

      //this.task = storageRef.child(`${this.basePath}/${this.auth.userProfile.name+"_"+fileUpload.file.name}`).put(fileUpload.file);
      this.task = storageRef.child(`${this.basePath}/${filename}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    }

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

          //console.log("File Upload ::: "+fileUpload.name);


          this.downloadURL = downloadURL;
          this.fileName =  fileUpload.file.name;
          //this.fUpload.name = fileUpload.file.name;
          //this.fUpload.url = downloadURL;

          this.saveFileData(fileUpload);
          let uResume = {} as UploadResume;
          uResume.ResumeFileName = this.fileName;
          uResume.UserID =  this.auth.userProfile.name;
          uResume.Username =  this.auth.userProfile.name;
          uResume.ResumeURL =  this.downloadURL;
          uResume.ResumeID =  "";
          uResume.ResumeExt =  this.fileName.substring(this.fileName.lastIndexOf(".")+1,this.fileName.length);
          uResume.ModifiedDate = new Date();
          if (id == null) {
            //console.log("It's a new upload");

            uResume.CreatedDate =  new Date();
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
            //uResume.ModifiedDate =  formatDate(new Date(), 'MM/dd/yyyy', 'en');
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




  pushFileToStorageBulk(username: string,resumefilename:string, fileUpload: FileUpload,progress: { percentage: number }, id: string, csvRecords) {


    const storageRef = firebase.storage().ref();

      //let filename = username+"."+resumefilename.substring(fileUpload.file.name.lastIndexOf(".")+1);
      let filename = fileUpload.file.name.substring(0,fileUpload.file.name.lastIndexOf("."))+"__"+username+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1);

      //let filename = username+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1);
      //console.log('Not Null -> File Name ', this.auth.userProfile.name.replace(".","_")+"."+fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf(".")+1));
     // console.log('Not Null -> File Name '+filename);

      //this.task = storageRef.child(`${this.basePath}/${this.auth.userProfile.name+"_"+fileUpload.file.name}`).put(fileUpload.file);
      this.task = storageRef.child(`${this.basePath}/${filename}`).put(fileUpload.file);
      //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);


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
        console.log(error);
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
          uResume.UserID =  username;
          uResume.Username =  username;
          uResume.ResumeURL =  this.downloadURL;
          uResume.ResumeID =  "";
          uResume.ResumeExt =  this.fileName.substring(this.fileName.lastIndexOf(".")+1,this.fileName.length);
          uResume.ModifiedDate = new Date();
          if (id == null) {
            //console.log("It's a new upload");

            uResume.CreatedDate =   new Date();;


          } 
          // else {
          //   //console.log("It's a update >>><<<< "+id);
          //   uResume.ModifiedDate =  formatDate(new Date(), 'MM/dd/yyyy', 'en');
          // }
          this.addUpdateUserResumeBulk(username,uResume, id,csvRecords);
          //this.selectedUploadResume = uResume;
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
          ref.where('Username','==',user).orderBy('ModifiedDate','desc'));
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
      uResume.CreatedDate = new Date();
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


  
  addUpdateUserResumeBulk(username: string,uResume: UploadResume, id: string,csvRecords) {
    let uProfile:UserProfile;
    //console.log("New Form ::: ------------->" + id);
      uResume.CreatedDate = new Date();
      this.urCollection.add(uResume).then(() => {
        uProfile = this.uProfileDataBulk(csvRecords);
        //console.log("User ID ::: "+uProfile.Username);
        this.uProfileservice.addUpdateUserProfileBulk(uProfile, username, new Date());

      });

    //this.AlgoliaUpdate();
  }


  private uProfileDataBulk(csvRec) {

    let uProfile = new UserProfile();

    uProfile.FirstName = csvRec[0];
    //console.log("uProfile.FirstName = csvRec[0] :: "+uProfile.FirstName);
    uProfile.LastName = csvRec[1];
    uProfile.Sex = csvRec[2];
    uProfile.Address1 = csvRec[3];
    uProfile.Address2 = csvRec[4];
    uProfile.City = csvRec[5];
    uProfile.State = csvRec[6];
    uProfile.ZipCode = csvRec[7];
    uProfile.Country = csvRec[8];
    uProfile.CellPhone = csvRec[9];
    uProfile.HomePhone = csvRec[10];
    uProfile.Email = csvRec[11];
    uProfile.CoverLetter = csvRec[12];
    uProfile.DesiredPosition = csvRec[13];
    uProfile.DesiredSalary = csvRec[14];
    uProfile.SkillSet = csvRec[15];
    uProfile.Education = csvRec[16];
    uProfile.EmploymentType = csvRec[17];
    uProfile.Username = csvRec[18];
    //uProfile.UserID = csvRec[19];
    uProfile.LinkedinURL = csvRec[19];
    uProfile.PersonalWebsite = csvRec[20];
    uProfile.FaceBookURL = csvRec[21];
    uProfile.IsRelocate = csvRec[22];
    uProfile.IsTravel = csvRec[23];
    uProfile.SecurityClearance = csvRec[24];
    uProfile.WorkAuthorization = csvRec[25];
    uProfile.YearsofExperince = csvRec[26];
    uProfile.institute = csvRec[27];
    uProfile.instituteCity = csvRec[28];
    uProfile.instituteCountry = csvRec[29];  

// console.log("uProfile.CurrentCompanySchool  ::: "+csvRec[33]);
// console.log("uProfile.CurrentCompanySchool  ::: "+csvRec[34]);

    uProfile.CurrentCompanySchool = csvRec[33];  
    uProfile.CurrentPosition = csvRec[34];  
      
    // this.uDetails = new UserDetails();
    // this.uDetails.userName = csvRec[18];
    // this.uDetails.userRole = "User";

    // this.uResume = new UploadResume();
    // this.uResume.Username = csvRec[18];
    // this.uResume.UserID = csvRec[19];
    return uProfile;

  }


  deleteUloadResumeByUsername(username) {
    let id;
    this.getResumeDetails(username).subscribe(ures=>{
      this.uResume = ures;
      for(let i=0;i<this.uResume.length;i++) {
        id = this.uResume[i].id;
        //console.log("ID  :: "+id);
        if ((id !=undefined) && (id !=null))
          this.deleteUloadResumeByid(id);
        
      }
    })

  }

  deleteUloadResumeByid(id) {
        //console.log("Apply Job ID : "+id);
    this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.UploadResume}/${id}`);
    this.upDoc.delete();
  }

  

}
