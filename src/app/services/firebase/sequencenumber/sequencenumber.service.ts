import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Sequence } from './sequence.model';
import { Observable } from 'rxjs';
//import * as admin from "firebase-admin";

import { take, tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class SequencenumberService {

  seqCollection: AngularFirestoreCollection <Sequence>;
  seqc: Observable<Sequence[]>;
  cqDoc: AngularFirestoreDocument<Sequence>;

  seqceee: Observable<Sequence>;

  sequence:Sequence[];

  constructor(private afs : AngularFirestore) { 
    this.seqCollection = this.afs.collection(FIREBASE_CONFIG.SequenceNumber);
  }


  getUpdateSequenceNumber() {

    //return this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`).valueChanges();

    // const db = admin.firestore();
    // db.runTransaction(async transaction =>{


    //     // Get the metadata document and increment the count. 
    //     const metaRef = db.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);
    //     const metaData = ( await transaction.get( metaRef ) ).data();      
    //     console.log("Metadata Info :::: "+metaData.SeqNum);

    //     const seqNum = metaData.SeqNum + 1;

    //     transaction.update(metaRef, { SeqNum:seqNum });
    //     return metaData.SeqNum;
    //   })
      this.cqDoc = this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${FIREBASE_CONFIG.SEQUENCENUMBER_ID}`);
      this.seqc =  this.seqCollection.snapshotChanges().pipe(take(1),map(changes => {
      // this.seqc =  this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`).snapshotChanges().pipe(take(1),map(changes => {        
        //this.seqc = this.seqCollection.snapshotChanges().pipe(map(changes => {
         return changes.map( a => {
           //console.log("List Service ..... 6");
          const data = a.payload.doc.data() as Sequence;
          this.cqDoc.update({ SeqNum: data.SeqNum + 1 })
          data.id = a.payload.doc.id;

          let num = ""+data.SeqNum+ Math.round(Math.random()*(999 + 1 - 100));
          data.SeqNum = Number(num);
          
         //let seqNum = data.SeqNum + 1;

         

          // this.updateData(data.id,seqNum);

           return data;
        });
       }));


    //  this.seqCollection = this.afs.collection(FIREBASE_CONFIG.SequenceNumber, ref =>
    //    ref);


      return this.seqc;

    
    // const orgRef = this.seqCollection.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);

    // this.afs.


      // let sequnumber=0;
      // this.cqDoc = this.afs.doc<Sequence>(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);
      // this.seqceee = this.cqDoc.valueChanges().pipe(take(1),map(value => {
        


      // });
      
      // this.seqceee.subscribe(value => {
      //   let  seq: Sequence = { SeqNum: value.SeqNum + 1 }
      //   sequnumber = value.SeqNum;
      //   console.log("Sequence Numbre :::: +"+sequnumber);
      //   this.cqDoc.update(seq);
      //   return sequnumber;
      // });
      // return sequnumber;

  }

  updateData(id,seqNum) {
    let  seq: Sequence = { SeqNum:seqNum }

    this.cqDoc = this.afs.doc(`${FIREBASE_CONFIG.SequenceNumber}/${id}`);
    this.cqDoc.update(seq).then((entry) => {
      //console.log("Entry ISSSSS "+entry);
    });

        

  }
}
