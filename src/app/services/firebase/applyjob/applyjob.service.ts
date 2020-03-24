//import { AuthService } from 'src/app/services/authentication/auth.service';
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

  constructor(private afs : AngularFirestore) {
    this.ajCollection = this.afs.collection(FIREBASE_CONFIG.ApplyJob);
  }

  addUpdateApplyJobs(ajobc :  ApplyJob) {
    this.ajCollection.add(ajobc).then((entry) => {
      //("Entry is "+entry.id);
    })
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


}
