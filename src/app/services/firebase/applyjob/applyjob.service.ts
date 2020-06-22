import { AuthService } from 'src/app/services/authentication/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FIREBASE_CONFIG, SEARCH_CONFIG } from 'src/app/global-config';
import { ApplyJob } from './applyjob.model';
import { map, catchError, take } from 'rxjs/operators';
import { SaveJob } from '../savejobs/savejobs.model';



@Injectable({
  providedIn: 'root'
})
export class ApplyjobService {

  ajCollection: AngularFirestoreCollection <ApplyJob>;
  ApplyJobc: Observable<ApplyJob[]>;
  aDoc: AngularFirestoreDocument<ApplyJob>;

  // sjCollection: AngularFirestoreCollection <SaveJob>;
  // SaveJobc: Observable<SaveJob[]>;
  // sDoc: AngularFirestoreDocument<SaveJob>;
  // sjob:SaveJob;


  constructor(private auth: AuthService, private afs : AngularFirestore) {
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob);
    //this.sjCollection = this.afs.collection(FIREBASE_CONFIG.SaveJob);
  }

  addUpdateApplyJobs(ajobc :  ApplyJob) {
    this.ajCollection.add(ajobc).then((entry) => {
      //console.log("Entry is "+entry.id);
     // this.saveAppliedJob(entry.id);

    })
  }



  // saveAppliedJob(id) {
  //   //this.sjob = new SaveJob();
  //   this.sDoc = this.afs.doc(`${FIREBASE_CONFIG.SaveJob}/${id}`);
  //   this.sjob = { ApplyJob : true};
  //   this.sDoc.update(this.sjob).then((entry) => {
  //     //console.log("Entry ISSSSS "+entry.id);


  //   });
  // }

  
  getApplyJobByAdmin(username,type,company,startDT?:Date,endDt?:Date) {

    // if ((searchParam.trim() == '') && (serachParam2.trim() !=''))
    // searchParam = serachParam2;

//console.log("Call Type :: "+type);

    if (type=='U') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('ApplyToEmail','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));      
    } else if (type=='C') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('company','==',company).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));      
    } else if (type=='UC') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('ApplyToEmail','==',username).where('company','==',company).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         
    } else if (type=='UD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT)); 
      }            
    } else if (type=='UDF') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT));                  
    } else if (type=='UDM') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('ApplyToEmail','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.MORE_PAGE_RECORD_LIMIT));                  
    } else if (type=='CD') {
      //console.log("!!!!! Start Date :: "+startDT+" End Date ::: "+endDt);
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Start Date :: "+startDT+" End Date ::: "+endDt);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));          
      } else if (startDT.toString() == 'Invalid Date') { 
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));            
      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));          
      }
    } else if (type=='UCD') {
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (startDT.toString() == 'Invalid Date') {  
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('company','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      }
    } else if (type=='UAD') {
      if (startDT.toString() == '') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         
      } else if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (startDT.toString() == 'Invalid Date') {  
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('ApplyToEmail','==',username).where('FromEmail','==',company).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      }
    
    } else if (type=='CUF') {  // This is for the candidate

        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.FIRST_PAGE_RECORD_LIMIT));         

    } else if (type=='CUA') {  // This is for the candidate

      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('username','==',username).orderBy('CreatedDate','desc'));         

    } else if (type=='CUD') {  // This is for the candidate
      //console.log("Username CUD : "+username);
      if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Username : "+username);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('username','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT)); 
      }

    }  else if (type=='AJID') { // Applicant by jobID

      if (startDT.toString() == '') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('JobID','==',username).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT)); 
      } else if ((startDT.toString() != 'Invalid Date') && ((endDt.toString() != 'Invalid Date'))) {
        //console.log("Username : "+username);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('JobID','==',username).where('CreatedDate', '>=', startDT).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         
      } else if (startDT.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('JobID','==',username).where('CreatedDate', '<=', endDt).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));         

      } else if (endDt.toString() == 'Invalid Date') {
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('JobID','==',username).where('CreatedDate', '>=', startDT).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT)); 
      } 
      } else if (type=='FPAJID') { // First Page by jobID

        //console.log("Username : "+username);
        this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
          ref.where('JobID','==',username).orderBy('CreatedDate','desc'));         
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
      ref.where('company','==',company).limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));

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

  // getApplyJobByJobID(JobID) {

  //   this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
  //     ref.where('JobID','==',JobID).orderBy('CreatedDate','desc'));

  //        // console.log("Country Name  ..... 1");
  //   this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
  //     // console.log("Country Name  ..... 2");
  //     return changes.map(a => {
  //       // console.log("Country Name  ..... 3");;
  //       const data = a.payload.doc.data() as ApplyJob;
  //       data.id = a.payload.doc.id;
  //       // console.log("Country Name  ..... 4" +data.id);
  //       return data;
  //     });
  //   }));

  //   return this.ApplyJobc;
  // }  


  getApplyJobByUser(user) {

    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
      ref.where('ApplyToEmail','==',user).limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));

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

  getApplyJobByUserJobIDCandidate(user,type,jobid) {
    //console.log("dshsdkfksdfklsdfklsld :::: jobid "+jobid);
    if (type == 'U') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('FromEmail','==',user).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));
    } else if (type == 'UJ') {
      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('FromEmail','==',user).where('JobID','==',jobid).orderBy('CreatedDate','desc').limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));
    }


          //console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(map(changes => {
       //console.log("Country Name  ..... 2");
      return changes.map(a => {
         
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        //console.log("Country Name  ..... 3::::: "+data.JobID);;
         //console.log("Apply Job ID" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  } 


  getApplyJobByUserJobIDCandidateTakeOne(user,jobid) {
    //console.log("dshsdkfksdfklsdfklsld :::: jobid "+jobid);

      this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref =>  
        ref.where('FromEmail','==',user).where('JobID','==',jobid).orderBy('CreatedDate','desc'));



          //console.log("Country Name  ..... 1");
    this.ApplyJobc = this.ajCollection.snapshotChanges().pipe(take(1),map(changes => {
       //console.log("Country Name  ..... 2");
      return changes.map(a => {
         
        const data = a.payload.doc.data() as ApplyJob;
        data.id = a.payload.doc.id;
        //console.log("Country Name  ..... 3::::: "+data.JobID);;
         //console.log("Apply Job ID" +data.id);
        return data;
      });
    }));

    return this.ApplyJobc;
  } 


  getApplyJob() {

    // console.log("Country Name  ..... 0");
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob, ref1 =>  ref1.limit(SEARCH_CONFIG.ALL_PAGE_RECORD_LIMIT));
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
