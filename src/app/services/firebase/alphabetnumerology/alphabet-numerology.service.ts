import { Injectable } from '@angular/core';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlphabetNumerology } from './alphabetnumerology.model';
import { AlphabetJobPrediction } from './alphabetjobprediction.model';

@Injectable({
  providedIn: 'root'
})
export class AlphabetNumerologyService {

  alphaNumeologyCollection: AngularFirestoreCollection <AlphabetNumerology>;
  alphaNumeologyDetailsc: Observable<AlphabetNumerology[]>;
  alphaNumeologyDoc: AngularFirestoreDocument<AlphabetNumerology>;

  alphabetJobPredictionCollection: AngularFirestoreCollection <AlphabetJobPrediction>;
  alphabetJobPredictionDetailsc: Observable<AlphabetJobPrediction[]>;
  alphabetJobPredictionDoc: AngularFirestoreDocument<AlphabetJobPrediction>;


  constructor(private afs : AngularFirestore) { 

  }

  getAlphabetValues() {

    // console.log("Country Name  ..... 0");
    this.alphaNumeologyCollection = this.afs.collection(FIREBASE_CONFIG.AlphabetNumerology, ref1 =>  ref1.orderBy('Alphabet','asc'));
         // console.log("Country Name  ..... 1");
    this.alphaNumeologyDetailsc = this.alphaNumeologyCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as AlphabetNumerology;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.alphaNumeologyDetailsc;
  }



  getAlphabetJobPredection(alphaNum) {

    // console.log("Country Name  ..... 0");
    this.alphabetJobPredictionCollection = this.afs.collection(FIREBASE_CONFIG.AlphabetJobPrediction, ref1 =>  
      ref1.where('AlphaNum','==',alphaNum));
         // console.log("Country Name  ..... 1");
    this.alphabetJobPredictionDetailsc = this.alphabetJobPredictionCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as AlphabetJobPrediction;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.alphabetJobPredictionDetailsc;
  }


}
