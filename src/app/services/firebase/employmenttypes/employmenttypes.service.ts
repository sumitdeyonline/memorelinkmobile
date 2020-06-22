import { Injectable } from '@angular/core';
import { EmploymentTypes } from './employmenttypes.model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})


export class EmploymenttypesService {

  emptypeCollection: AngularFirestoreCollection <EmploymentTypes>;
  emptypeProfilec: Observable<EmploymentTypes[]>;
  eDoc: AngularFirestoreDocument<EmploymentTypes>;

  constructor(private afs : AngularFirestore, private auth: AuthService) { 
    this.emptypeCollection = this.afs.collection(FIREBASE_CONFIG.EmploymentTypes);
  }


  getEmploymentTypesByUse(useTag) {

    // console.log("Country Name  ..... 0");
    this.emptypeCollection = this.afs.collection(FIREBASE_CONFIG.EmploymentTypes, ref1 =>  
      ref1.where('useTag','in',['C',useTag]).orderBy('sortOrder','asc'));
      //ref1.where('useTag','==','C').where('useTag','==',useTag).where('useTag','in',['C',useTag]).orderBy('sortOrder','asc'));

    this.emptypeProfilec = this.emptypeCollection.snapshotChanges().pipe(map(changes => {

      return changes.map(a => {

        const data = a.payload.doc.data() as EmploymentTypes;
        data.id = a.payload.doc.id;

        return data;
      });
    }));

    return this.emptypeProfilec;
  }


  getEmploymentTypes() {

    // console.log("Country Name  ..... 0");
    this.emptypeCollection = this.afs.collection(FIREBASE_CONFIG.EmploymentTypes, ref1 =>  ref1.orderBy('sortOrder','asc'));
         // console.log("Country Name  ..... 1");
    this.emptypeProfilec = this.emptypeCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as EmploymentTypes;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.emptypeProfilec;
  }

  addUpdate(empTypes :  EmploymentTypes,id: string,createDate: Date) {
    empTypes.LastModifiedDate = new Date();
    if ((id == null) || (id == '')) {
      //uprofile.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      empTypes.CreatedDate = new Date();
      empTypes.CreatedBy = this.auth.userProfile.name;
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      //this.upCollection.add(uprofile);

      this.emptypeCollection.add(empTypes).then((entry) => {

        //console.log("Entry ISSSSS "+entry.id);


      });


    } else {
      //console.log("UPDATE FORM ...." + id);
      //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      this.eDoc = this.afs.doc(`${FIREBASE_CONFIG.EmploymentTypes}/${id}`);
      this.eDoc.update(empTypes);

      this.eDoc.update(empTypes).then((entry) => {
        //console.log("Entry ISSSSS "+entry.id);


      });

    }
    //this.AlgoliaUpdate();
  }

  deleteState(id) {
    this.eDoc = this.afs.doc(`${FIREBASE_CONFIG.EmploymentTypes}/${id}`);
    this.eDoc.delete();
  }


}
