import { AuthService } from 'src/app/services/authentication/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { ApplyJob } from './applyjob.model';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApplyjobService {

  ajCollection: AngularFirestoreCollection <ApplyJob>;
  ApplyJobc: Observable<ApplyJob[]>;
  aDoc: AngularFirestoreDocument<ApplyJob>;

  constructor(private auth: AuthService, private afs : AngularFirestore) {
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob);
  }

  addUpdateApplyJobs(ajobc :  ApplyJob) {
    this.ajCollection.add(ajobc).then((entry) => {
      //("Entry is "+entry.id);
    })
  }

  getApplyJobByAdmin(username,type,company,startDT?:Date,endDt?:Date) {

    // if ((searchParam.trim() == '') && (serachParam2.trim() !=''))
    // searchParam = serachParam2;

//console.log("Call Type :: "+type);

    if (type=='U') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('ApplyToEmail','==',username).orderBy('CreatedDate','desc'));      
    } else if (type=='C') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('company','==',company).orderBy('CreatedDate','desc'));      
    } else if (type=='UC') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('ApplyToEmail','==',username).where('company','==',company).orderBy('CreatedDate','desc'));         
    }else if (type=='UD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc')); 
      }            
    } else if (type=='CD') {
      //console.log("!!!!! Start Date :: "+startDT+" End Date ::: "+endDt);
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Start Date :: "+startDT+" End Date ::: "+endDt);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));          
      } else if (startDT.toString() == 'Invalid Date') { 
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));            
      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc'));          
      }
    } else if (type=='UCD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (startDT.toString() == 'Invalid Date') {  
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc'));         

      }
    } else if (type=='CUD') {  // This is for the candidate
      //console.log("Username CUD : "+username);
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Username : "+username);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc'));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc')); 
      }

    }  




         // console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  }    

  getApplyJobByCompany(company) {

    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
      ref.where('company','==',company));

         // console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  }  


  getApplyJobByUser(user) {

    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
      ref.where('ApplyToEmail','==',user));

         // console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  } 


  getApplyJob() {

    // console.log("Country Name  ..... 0");
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref1 =>  ref1);
         // console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  }

  deleteApplyJobWithID(id) {
    //console.log("Apply Job ID : "+id);
    this.aDoc = this.afs.doc(`${FIREBASE_CONFIG.ApplyJob}/${id}`);
    this.aDoc.delete();
  }

}
