import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { PostJobc } from './postjob.model';

import { formatDate } from '@angular/common';


 import * as algoliasearch from 'algoliasearch';
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

//import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG, SEARCH_CONFIG } from 'src/app/global-config';

//import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { UserdetailsService } from '../userdetails/userdetails.service';
// import { UserDetails } from '../userdetails/userdetails.model';



@Injectable()
export class PostjobService {

// Algolia Search

// ALGOLIA_APP_ID = "8I5VGLVBT1";
// ALGOLIA_ADMIN_KEY = "48b207b10886fb32395d5b3ad97f338f";
// ALGOLIA_INDEX_NAME_POST_JOB = "PostJob";

  //selectedPostJob: PostJobc;

  selectedPostJobc: PostJobc;
  pjCollection: AngularFirestoreCollection <PostJobc>;
  PostJobc: Observable<PostJobc[]>;
  pjDoc: AngularFirestoreDocument<PostJobc>;
  pjobDoc: AngularFirestoreDocument<PostJobc>;


  client: any;
  index: any;
  private headers
  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  jobs = [];

  constructor(private afs : AngularFirestore,  private http: HttpClient) {
    this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob);
    //this.faqList = this.firebase.list('faq');
    //this.faqs = this.afs.collection('faq').valueChanges();
    //console.log("List Service ..... 1");
    // this.faqCollection = this.afs.collection(FIREBASE_CONFIG.Faq, ref => ref.orderBy(FIREBASE_CONFIG.OrderByFaq,'asc'));
    // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Faqc;
    //     data.id = a.payload.doc.id;
    //     //console.log("List Service ..... 2");
    //     return data;
    //   });
    // });
  }


  getPostJobs(keyword, location) {
    //console.log("Keyword : "+keyword+"  Location : "+location);

    const end = keyword + '\uf8ff';

    this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>

       ref
        .orderBy('JobTitle')
        .startAt(keyword.toLowerCase()) //);
        .endAt(end.toLowerCase()));

          //ref.where('JobTitle','>=',keyword).orderBy(FIREBASE_CONFIG.OrderByPostJob,'asc'));
          // console.log("List Service ..... 4");
    this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as PostJobc;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.PostJobc;
  }


  getPostJobsAlgolia(keyword, location) {


    // this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY,
    //   { protocol: 'https:' });
    //   console.log("Test 1 ....1" );

    /****** Need to open Later ********/


    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });


      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
      //console.log("Test 1 ....2..2" );

      this.index.search({

        query: keyword,
        //query: '{ JobState:CA }',
        //attributesToRetrieve: ['JobTitle', 'JobDesc']

        // restrictSearchableAttributes: [
        //   'JobTitle',
        //   'JobDesc'
        // ]
        //filters: 'JobState=CA'

      })
      .then((data) => {
        this.jobs = data.hits;
        for(let i=0;i<this.jobs.length;i++) {
          //console.log("Algolia Job ::::::::: =>  "+this.jobs[i].JobState);
          //console.log("Algolia Job ::::::::: =>  "+this.jobs[i].JobTitle);
        }
        return this.jobs;
      })
      return this.jobs;

    /**********End*********/
  }

  // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
  //   return changes.map(a => {
  //     const data = a.payload.doc.data() as Faqc;
  //     data.id = a.payload.doc.id;
  //     console.log("List Service ..... 2");
  //     return data;
  //   });
  // });



  // addUpdatePostJobs(pjobc :  PostJobc,id: string, createDate: Date, createdBy: string, uDetails: UserDetails) {

  //   //pjobc.LastModifiedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');

  //   pjobc.LastModifiedDate = new Date();
  //   pjobc.LastModifiedBy = this.auth.userProfile.name;

  //   if ((id == null) || (id == '')) {
  //     //pjobc.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  //     pjobc.CreatedDate = new Date();


  //     pjobc.CreatedBy = this.auth.userProfile.name;
  //     pjobc.isSearchable = true;

  //     this.uDetails.addUpdateUserDetails(uDetails.id,uDetails.userName,uDetails.userRole,uDetails.company,uDetails.companyAddress,uDetails.phone,uDetails.postjobCount)

  //     //pjobc.JobTitle =
  //     // console.log ("Create Date ::: "+pjobc.CreatedDate);
  //     // console.log ("Created By ::: "+pjobc.CreatedBy);
  //     // console.log("NEW FORM ....Service");

  //     // Generate New ID
  //     // var idBefore =  this.afs.createId();
  //     // console.log("ID Created :::: "+idBefore);


  //     this.pjCollection.add(pjobc).then((entry) => {

  //       //console.log("Entry ISSSSS "+entry.id);

  //       this.AlgoliaObjectUpdate(id,pjobc,entry.id, createDate, createdBy);



  //     });


  //   } else {
  //     //console.log("UPDATE FORM ...." + id);

  //     //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
  //     this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);
  //     this.pjDoc.update(pjobc).then((entry) => {
  //       //console.log("Entry ISSSSS "+entry.id);
  //       this.AlgoliaObjectUpdate(id,pjobc,id, createDate, createdBy);


  //     });

  //     // this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
  //     //   { protocol: SEARCH_CONFIG.PROTOCOLS });


  //       // var objects = [{
  //       //   firstname: 'Jimmie',
  //       //   lastname: 'Barninger',
  //       //   objectID: id
  //       // }];




  //       // this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
  //       // pjobc.objectID = id;
  //       // console.log("Content ::::::: "+objects);

  //       // this.index.saveObjects(objects, function (err, content) {
  //       //   if (err) throw err;
  //       //   console.log("Add Content :::::: "+content);
  //       // });
  //       // this.index.addObjects(objects, function(err, content) {
  //       //   console.log(content);
  //       // });

  //   }
  //   //this.AlgoliaUpdate();

  // }

  htmlToPlaintext(text) {
    return text ? String(text).replace(/<[^>]+>/gm, ' ') : '';
  }

  AlgoliaObjectUpdate(tranType, pjobc, id, createDate, createdBy) {
    //console.log("Algolia Update Object..... :::::: "+createDate.seconds);

    // console.log("Job Desc Prev ::: "+pjobc.JobDesc);
    // console.log("Job Skill Prev ::: "+pjobc.Skills);

    let jobDesc = this.htmlToPlaintext(pjobc.JobDesc);
    let skill = this.htmlToPlaintext(pjobc.Skills);

    // console.log("Job Desc ::: "+jobDesc);
    // console.log("Job Skill ::: "+skill);

    let objects;
    if ((tranType == null) || (tranType == '')) {
      objects = [{
        id: id,
        objectID: id,
        JobTitle:pjobc.JobTitle,
        Company:pjobc.Company,
        // JobDesc:pjobc.JobDesc,
        // Skills:pjobc.Skills,
        JobDesc:jobDesc,
        Skills:skill,
        // ApplyToEmail:pjobc.ApplyToEmail,
        // CCToEmail:pjobc.CCToEmail,
        // ApplyToURL:pjobc.ApplyToURL,
        JobCity:pjobc.JobCity,
        JobCountry:pjobc.JobCountry,
        JobState:pjobc.JobState,
        JobZip:pjobc.JobZip,
        EmploymentTypes:pjobc.EmploymentTypes,
        JobPayRate:pjobc.JobPayRate,
        Compensation:pjobc.Compensation,
        JobLength:pjobc.JobLength,
        TravelRequirements:pjobc.TravelRequirements,
        isTeleComute:pjobc.isTeleComute,
        CreatedDate : pjobc.CreatedDate.getTime(),
        CreatedBy : pjobc.CreatedBy,
        LastModifiedDate:pjobc.LastModifiedDate.getTime(),
        LastModifiedBy:pjobc.LastModifiedBy
      }];
    } else {
      objects = [{
        id: id,
        objectID: id,
        JobTitle:pjobc.JobTitle,
        Company:pjobc.Company,
        // JobDesc:pjobc.JobDesc,
        // Skills:pjobc.Skills,
        JobDesc:jobDesc,
        Skills:skill,
        // ApplyToEmail:pjobc.ApplyToEmail,
        // CCToEmail:pjobc.CCToEmail,
        // ApplyToURL:pjobc.ApplyToURL,
        JobCity:pjobc.JobCity,
        JobCountry:pjobc.JobCountry,
        JobState:pjobc.JobState,
        JobZip:pjobc.JobZip,
        EmploymentTypes:pjobc.EmploymentTypes,
        JobPayRate:pjobc.JobPayRate,
        Compensation:pjobc.Compensation,
        JobLength:pjobc.JobLength,
        TravelRequirements:pjobc.TravelRequirements,
        isTeleComute:pjobc.isTeleComute,
        //CreatedDate : createDate.getTime(),
        CreatedDate : createDate.seconds,
        CreatedBy : createdBy,
        LastModifiedDate:pjobc.LastModifiedDate.getTime(),
        LastModifiedBy:pjobc.LastModifiedBy
      }];
    }

 /****** Need to open Later ********/

    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
      // pjobc.objectID = id;
      // console.log("Content ::::::: "+objects);

      this.index.saveObjects(objects, function (err, content) {
        if (err) throw err;
        //console.log("Add Content :::::: "+content);
      });
  /******* End *********/
  }



  getPostJobsByUser(searchParam, type) {
    //console.log("List Service ..... 3"+this.PostJobc);

    if (type=='U') {
      this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>
        ref.where('CreatedBy','==',searchParam).orderBy('LastModifiedDate','desc'));
    } else if (type=='C') {
      this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>
        ref.where('Company','==',searchParam).orderBy('LastModifiedDate','desc'));      
    } 
          //console.log("List Service ..... 4");
    this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
      //console.log("List Service ..... 5");
      return changes.map(a => {
        //console.log("List Service ..... 6");
        const data = a.payload.doc.data() as PostJobc;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));



    // this.faqs = this.faqCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Faqc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service ..... 2");
    //     return data;
    //   });
    // });


    return this.PostJobc;
  }

  getPostJobsById(id) {
    //console.log("List Service ..... 3 ::::::=> "+id);

    //this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`).valueChanges()
    // this.pjobDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);


    return this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`).valueChanges();

    // this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob, ref =>
    //       ref.where('id','==',id));
    //       console.log("List Service ..... 4 "+id);
    // this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
    //   console.log("List Service ..... 5");
    //   return changes.map(a => {
    //     console.log("List Service ..... 6");
    //     const data = a.payload.doc.data() as PostJobc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service 11111 ..... 2");
    //     return data;
    //   });
    // }));
    // return this.PostJobc;

    // this.pjCollection = this.afs.collection(FIREBASE_CONFIG.PostJob+id);
    // this.PostJobc = this.pjCollection.snapshotChanges().pipe(map(changes => {
    //   console.log("List Service ..... 5");
    //   return changes.map(a => {
    //     console.log("List Service ..... 6");
    //     const data = a.payload.doc.data() as PostJobc;
    //     data.id = a.payload.doc.id;
    //     console.log("List Service 11111 ..... 2");
    //     return data;
    //   });
    // }));
    // return this.PostJobc;


  }

  deletePostJob(postc :  PostJobc) {
    this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${postc.id}`);
    this.pjDoc.delete();
  }

  deletePostJobWithID(id) {
    this.pjDoc = this.afs.doc(`${FIREBASE_CONFIG.PostJob}/${id}`);
    this.pjDoc.delete();

    // Algolia Update

 /****** Need to open Later ********/

    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });


      //console.log("Delete Index :::: "+id);
      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);


      this.index.deleteObject(id, function(err, content) {
        if (err) throw err;
       // console.log("Delete Content :::::: "+content);
      });
  /***** End *****/
  
      //this.index.deleteObject(id);

  }


  // OLD

  /*getData(listpath) {

    return this.firebase.list(listpath).valueChanges();
    //return this.firebase.list(listpath, )
    //return this.faqList;
  }



  insertFaq(faq :  Faq)
  {
    console.log("Question :::: "+faq.question);
    console.log("Answer :::: "+faq.answer);
    console.log("Category :::: "+faq.category);
    console.log("Details :::: "+faq.details);

    this.faqList.push({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      details : faq.details
    });
  }
  updateFaq(faq :  Faq) {
    this.faqList.update(faq.$key,
    {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      details : faq.details
    })
  }*/
}
