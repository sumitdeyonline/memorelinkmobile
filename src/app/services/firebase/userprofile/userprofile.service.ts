import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { FIREBASE_CONFIG, SEARCH_CONFIG } from 'src/app/global-config';
import { UserProfile } from './userprofile.model';
import { Country } from './country.model';
import { State } from './state.model';
//import { Http } from '@angular/http';
import { formatDate } from '@angular/common';
import * as algoliasearch from 'algoliasearch';
import { UserRole } from './userrole.model';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../email/email.service';
import { WorkAuthorization } from './workauthorization.model';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  client: any;
  index: any;

  selectedUserProfile: UserProfile;
  upCollection: AngularFirestoreCollection <UserProfile>;
  UserProfilec: Observable<UserProfile[]>;
  upDoc: AngularFirestoreDocument<UserProfile>;

  countryCollection: AngularFirestoreCollection <Country>;
  countryProfilec: Observable<Country[]>;
  cDoc: AngularFirestoreDocument<Country>;

  stateCollection: AngularFirestoreCollection <State>;
  stateProfilec: Observable<State[]>;
  sDoc: AngularFirestoreDocument<State>;

  workauthCollection: AngularFirestoreCollection <WorkAuthorization>;
  wauthProfilec: Observable<WorkAuthorization[]>;
  wDoc: AngularFirestoreDocument<WorkAuthorization>;


  userRoleCollection: AngularFirestoreCollection <UserRole>;
  userRoleProfilec: Observable<UserRole[]>;

  userProfile: UserProfile[];
  //userProfile = [];

  
  constructor(private afs : AngularFirestore, private auth: AuthService, private http: HttpClient,private sEmail: EmailService) {
    this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile);
    this.countryCollection = this.afs.collection(FIREBASE_CONFIG.Country);
    this.stateCollection = this.afs.collection(FIREBASE_CONFIG.State);
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles);
    this.workauthCollection = this.afs.collection(FIREBASE_CONFIG.WorkAuthorization);
  }

  addUpdateUserProfile(uprofile :  UserProfile,id: string,createDate: Date) {
    uprofile.LastModifiedDate = new Date();
    if ((id == null) || (id == '')) {
      //uprofile.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      uprofile.CreatedDate = new Date();
      uprofile.Username = this.auth.userProfile.name;
      uprofile.isSearchable = true;
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      //this.upCollection.add(uprofile);

      this.upCollection.add(uprofile).then((entry) => {

        //console.log("Entry ISSSSS "+entry.id);

        this.AlgoliaObjectUpdate(id,uprofile,entry.id, createDate);


      });


    } else {
      //console.log("UPDATE FORM ...." + id);
      //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.UserProfile}/${id}`);
      this.upDoc.update(uprofile);

      this.upDoc.update(uprofile).then((entry) => {
        //console.log("Entry ISSSSS "+entry.id);
        this.AlgoliaObjectUpdate(id,uprofile,id, createDate);


      });

    }
    //this.AlgoliaUpdate();
  }


  addUpdateUserProfileBulk(uprofile : UserProfile,username: string,createDate: Date) {
    //console.log("Bulk Upload");
    let uUploadProfile = {} as UserProfile;
    uUploadProfile.LastModifiedDate = new Date();

    uUploadProfile.CreatedDate = new Date();
    uUploadProfile.Username = username;
    uUploadProfile.isSearchable = true; 
    
    uUploadProfile.FirstName = uprofile.FirstName;
    uUploadProfile.LastName = uprofile.LastName;
    uUploadProfile.Sex = uprofile.Sex;
    uUploadProfile.Address1 = uprofile.Address1;
    uUploadProfile.Address2 = uprofile.Address2;
    uUploadProfile.City = uprofile.City;
    uUploadProfile.State = uprofile.State;
    uUploadProfile.ZipCode = uprofile.ZipCode;
    uUploadProfile.Country = uprofile.Country;


    uUploadProfile.CurrentCompanySchool = uprofile.CurrentCompanySchool;
    uUploadProfile.CurrentPosition = uprofile.CurrentPosition;

// console.log("uUploadProfile.CurrentCompanySchool :::: "+uUploadProfile.CurrentCompanySchool);
// console.log("uUploadProfile.CurrentPosition :::: "+uUploadProfile.CurrentPosition);

    uUploadProfile.CellPhone = uprofile.CellPhone;
    uUploadProfile.HomePhone = uprofile.HomePhone;
    uUploadProfile.Email = uprofile.Email;
    uUploadProfile.CoverLetter = uprofile.CoverLetter;
    uUploadProfile.DesiredPosition = uprofile.DesiredPosition;
    uUploadProfile.DesiredSalary = uprofile.DesiredSalary;
    uUploadProfile.SkillSet = uprofile.SkillSet;
    uUploadProfile.Education = uprofile.Education;
    uUploadProfile.EmploymentType = uprofile.EmploymentType;
    uUploadProfile.Username = uprofile.Username;
    uUploadProfile.UserID = uprofile.Username;
    uUploadProfile.LinkedinURL = uprofile.LinkedinURL;
    uUploadProfile.PersonalWebsite = uprofile.PersonalWebsite;
    uUploadProfile.FaceBookURL = uprofile.FaceBookURL;

    // if (uprofile.IsRelocate == true)
    //   uUploadProfile.IsRelocate = true;
    // else 
    //   uUploadProfile.IsRelocate = false;

    uUploadProfile.IsRelocate = uprofile.IsRelocate;

    // if (uprofile.IsTravel == true)
    //   uUploadProfile.IsTravel = true;
    // else 
    //   uUploadProfile.IsTravel = false;    

    uUploadProfile.IsTravel = uprofile.IsTravel;

    // if (uprofile.SecurityClearance == true)
    //   uUploadProfile.SecurityClearance = true;
    // else 
    //   uUploadProfile.SecurityClearance = false;    

    uUploadProfile.SecurityClearance = uprofile.SecurityClearance;


    uUploadProfile.WorkAuthorization = uprofile.WorkAuthorization;
    uUploadProfile.YearsofExperince = uprofile.YearsofExperince;
    uUploadProfile.institute = uprofile.institute;
    uUploadProfile.instituteCity = uprofile.instituteCity;
    uUploadProfile.instituteCountry = uprofile.instituteCountry;     
      //pjobc.JobTitle =
      // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // console.log ("Created By ::: "+pjobc.CreatedBy);
      // console.log("NEW FORM ....Service");
      //this.upCollection.add(uprofile);

      //this.upCollection.add(uprofile).then((entry) => {
      this.upCollection.add(uUploadProfile).then((entry) => {        

        //console.log("Entry ISSSSS "+entry.id);

        //this.AlgoliaObjectUpdate(null,uprofile,entry.id, createDate);
        this.AlgoliaObjectUpdateBulk(null,uUploadProfile,entry.id, createDate);

        //Email Sent to the users
        let subject = uprofile.FirstName+' '+uUploadProfile.LastName+', we are excited to be a part of MeMoreLink';
        let body = '<b>'+uprofile.FirstName+' '+uUploadProfile.LastName+', we are excited to be a part of MeMoreLink, we are premier Job site where you can search your dream job with the Numerology Predection, please visit our site(https://memorelink.com) . Wish you best of luck for your future</b>  <br /><br /> UserID : '+uUploadProfile.Email+'<br />Temp Password: Memorelink1 <br /><br />Please send us email(support@memorelink.com) if you want to unsubscribe yourself from us.<br/></br> <b>Thank you <br>MeMoreLink Team</b> '
        this.sEmail.sendEmail(uUploadProfile.Email,'',subject,body);
      });

  }


  getUserProfileById(id) {
    //console.log("List Service ..... 3 ::::::=> "+id);

    return this.afs.doc(`${FIREBASE_CONFIG.UserProfile}/${id}`).valueChanges()

  }

  getUserDetails(usersearchparam, stype)  {
    //console.log("List Service ..... 3 "+usersearchparam);

    if (stype == 'U'){
      this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile, ref =>
        ref.where('Username','==',usersearchparam));
    } else if (stype == 'HP') {
      this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile, ref =>
        ref.where('HomePhone','==',usersearchparam));
    } else if (stype == 'CP') {
      this.upCollection = this.afs.collection(FIREBASE_CONFIG.UserProfile, ref =>
        ref.where('CellPhone','==',usersearchparam));
    }

          // console.log("List Service ..... 4");
    this.UserProfilec = this.upCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserProfile;
        data.id = a.payload.doc.id;
        //console.log("List Service 11111 ..... 2--->>>>> Data load :: "+data.id);
        return data;
      });
    }));

    return this.UserProfilec;
  }


  getCountry() {

    // console.log("Country Name  ..... 0");
    this.countryCollection = this.afs.collection(FIREBASE_CONFIG.Country, ref1 =>  ref1.orderBy('CountryName','asc'));
         // console.log("Country Name  ..... 1");
    this.countryProfilec = this.countryCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as Country;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.countryProfilec;
  }


  getCountryName(countryID) {

    // console.log("Country Name  ..... 0");
    this.countryCollection = this.afs.collection(FIREBASE_CONFIG.Country, ref1 =>  
      ref1.where('countryID','==',countryID));
         // console.log("Country Name  ..... 1");
    this.countryProfilec = this.countryCollection.snapshotChanges().pipe(map(changes => {
      // console.log("Country Name  ..... 2");
      return changes.map(a => {
        // console.log("Country Name  ..... 3");;
        const data = a.payload.doc.data() as Country;
        data.id = a.payload.doc.id;
        // console.log("Country Name  ..... 4" +data.id);
        return data;
      });
    }));

    return this.countryProfilec;
  }

  getWorkAuthorization(type) {

    this.workauthCollection = this.afs.collection(FIREBASE_CONFIG.WorkAuthorization, ref =>
      ref.where('Auth_Type','==',type).orderBy('SortBy', 'asc'));
       //console.log("List Service ..... 4");
      this.wauthProfilec = this.workauthCollection.snapshotChanges().pipe(map(changes => {
        //console.log("List Service ..... 5");
        return changes.map(a => {
          // console.log("List Service ..... 6");
          const data = a.payload.doc.data() as WorkAuthorization;
          data.id = a.payload.doc.id;
          //console.log("List Service 11111 ..... 2");
          return data;
        });
      }));

    return this.wauthProfilec;
  }

  addUpdateCountry(cnry :  Country, id) {
    if ((id == null) || (id == '')) {
      this.countryCollection.add(cnry).then((entry) => {
        //console.log("Country is "+entry.id);
      })      
    } else {
      //console.log("Update");
      this.cDoc = this.afs.doc(`${FIREBASE_CONFIG.Country}/${id}`);
      this.cDoc.update(cnry);
    }

  }

  deleteCountry(id) {
    this.cDoc = this.afs.doc(`${FIREBASE_CONFIG.Country}/${id}`);
    this.cDoc.delete();
  }

  getStateDetails(country) {
    //console.log("Country Name "+country);
    this.stateCollection = this.afs.collection(FIREBASE_CONFIG.State, ref =>
          ref.where('CountryName','==',country).orderBy('StateDisplayName', 'asc'));
           //console.log("List Service ..... 4");
    this.stateProfilec = this.stateCollection.snapshotChanges().pipe(map(changes => {
       //console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as State;
        data.id = a.payload.doc.id;
         //console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.stateProfilec;
  }

  addUpdateState(state :  State, id) {
    if ((id == null) || (id == '')) {
      this.stateCollection.add(state).then((entry) => {
        //console.log("Country is "+entry.id);
      })      
    } else {
      //console.log("Update");
      this.sDoc = this.afs.doc(`${FIREBASE_CONFIG.State}/${id}`);
      this.sDoc.update(state);
    }

  }

  deleteState(id) {
    this.sDoc = this.afs.doc(`${FIREBASE_CONFIG.State}/${id}`);
    this.sDoc.delete();
  }

  getUserRoleDetails() {
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles, ref =>
          ref.where('RoleType','==','P').orderBy('OrderBy', 'asc'));
          // console.log("List Service ..... 4");
    this.userRoleProfilec = this.userRoleCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserRole;
        data.id = a.payload.doc.id;
        // console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.userRoleProfilec;
  }

  getUserAllRoles() {
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles, ref =>
          ref.orderBy('OrderBy', 'asc'));
          // console.log("List Service ..... 4");
    this.userRoleProfilec = this.userRoleCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserRole;
        data.id = a.payload.doc.id;
        // console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.userRoleProfilec;
  }

  getUserRoleByRoles(rolename) {
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles, ref =>
          ref.where('RoleName','==',rolename));
          // console.log("List Service ..... 4");
    this.userRoleProfilec = this.userRoleCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserRole;
        data.id = a.payload.doc.id;
        // console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.userRoleProfilec;
  }

  AlgoliaObjectUpdate(tranType, uprofile, id, createDate) {
    //console.log("Algolia Update Object..... :::::: "+createDate.seconds);
    let objects;


    if ((tranType == null) || (tranType == '')) {
      objects = [{
        id: id,
        objectID: id,
        FirstName:uprofile.FirstName,
        LastName:uprofile.LastName,
        Sex:uprofile.Sex,
        City:uprofile.City,
        State:uprofile.State,
        ZipCode:uprofile.ZipCode,
        Country:uprofile.Country,
        CurrentCompanySchool:uprofile.CurrentCompanySchool,
        CurrentPosition:uprofile.CurrentPosition,        
        Email:uprofile.Email,
        HomePhone:uprofile.HomePhone,
        CellPhone:uprofile.CellPhone,
        EmploymentType:uprofile.EmploymentType,
        DesiredPosition:uprofile.DesiredPosition,
        DesiredSalary:uprofile.DesiredSalary,
        IsRelocate:uprofile.IsRelocate,
        IsTravel:uprofile.IsTravel,
        YearsofExperince:uprofile.YearsofExperince,
        WorkAuthorization:uprofile.WorkAuthorization,
        SecurityClearance:uprofile.SecurityClearance,
        SkillSet:uprofile.SkillSet,
        Education:uprofile.Education,
        SalaryExpectation:uprofile.SalaryExpectation,
        Username:this.auth.userProfile.name,
        CreatedDate:uprofile.CreatedDate.getTime(),
        LastModifiedDate:uprofile.LastModifiedDate.getTime(),
        isSearchable:true,

      }];
    } else {
      objects = [{
        id: id,
        objectID: id,
        FirstName:uprofile.FirstName,
        LastName:uprofile.LastName,
        Sex:uprofile.Sex,
        City:uprofile.City,
        State:uprofile.State,
        ZipCode:uprofile.ZipCode,
        Country:uprofile.Country,
        CurrentCompanySchool:uprofile.CurrentCompanySchool,
        CurrentPosition:uprofile.CurrentPosition,        
        Email:uprofile.Email,
        HomePhone:uprofile.HomePhone,
        CellPhone:uprofile.CellPhone,
        EmploymentType:uprofile.EmploymentType,
        DesiredPosition:uprofile.DesiredPosition,
        DesiredSalary:uprofile.DesiredSalary,
        IsRelocate:uprofile.IsRelocate,
        IsTravel:uprofile.IsTravel,
        YearsofExperince:uprofile.YearsofExperince,
        WorkAuthorization:uprofile.WorkAuthorization,
        SecurityClearance:uprofile.SecurityClearance,
        SkillSet:uprofile.SkillSet,
        Education:uprofile.Education,
        SalaryExpectation:uprofile.SalaryExpectation,
        Username:this.auth.userProfile.name,

        CreatedDate : createDate.seconds,
        LastModifiedDate:uprofile.LastModifiedDate.getTime(),
        isSearchable:true,

      }];
    }


    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);
      // pjobc.objectID = id;
      // console.log("Content ::::::: "+objects);

      this.index.saveObjects(objects, function (err, content) {
        if (err) throw err;
        //console.log("Add Content :::::: "+content);
      });

  }



  AlgoliaObjectUpdateBulk(tranType, uprofile, id, createDate) {
    //console.log("Algolia Update Object..... :::::: "+createDate.seconds);
    let objects;
    //console.log("Username(Algolia) :::: "+uprofile.Username);

    if ((tranType == null) || (tranType == '')) {
      objects = [{
        id: id,
        objectID: id,
        FirstName:uprofile.FirstName,
        LastName:uprofile.LastName,
        Sex:uprofile.Sex,
        City:uprofile.City,
        State:uprofile.State,
        ZipCode:uprofile.ZipCode,
        Country:uprofile.Country,
        CurrentCompanySchool:uprofile.CurrentCompanySchool,
        CurrentPosition:uprofile.CurrentPosition,        
        Email:uprofile.Email,
        HomePhone:uprofile.HomePhone,
        CellPhone:uprofile.CellPhone,
        EmploymentType:uprofile.EmploymentType,
        DesiredPosition:uprofile.DesiredPosition,
        DesiredSalary:uprofile.DesiredSalary,
        IsRelocate:uprofile.IsRelocate,
        IsTravel:uprofile.IsTravel,
        YearsofExperince:uprofile.YearsofExperince,
        WorkAuthorization:uprofile.WorkAuthorization,
        SecurityClearance:uprofile.SecurityClearance,
        SkillSet:uprofile.SkillSet,
        Education:uprofile.Education,
        SalaryExpectation:uprofile.SalaryExpectation,
        Username:uprofile.Username,
        CreatedDate:uprofile.CreatedDate.getTime(),
        LastModifiedDate:uprofile.LastModifiedDate.getTime(),
        isSearchable:true,

      }];
    } 


    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);
      // pjobc.objectID = id;
      // console.log("Content ::::::: "+objects);

      this.index.saveObjects(objects, function (err, content) {
        if (err) throw err;
        //console.log("Add Content :::::: "+content);
      });

  }

  deleteUserProfileByName(username) {

    this.getUserDetails(username,'U').subscribe(uprofile=> {
      this.userProfile = uprofile;
      //console.log("Profile :::: "+this.userProfile[0].id);
      if ((this.userProfile[0] !=undefined) && (this.userProfile[0] !=null)) {
        this.deleteUserProfileById(this.userProfile[0].id);

        this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
          { protocol: SEARCH_CONFIG.PROTOCOLS });
    
          this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME_PROFILE);
    
    
          this.index.deleteObject(this.userProfile[0].id, function(err, content) {
            if (err) throw err;
           // console.log("Delete Content :::::: "+content);
          });
      }

    })


  }

  deleteUserProfileById(id) {
    //console.log("List Service ..... 3 ::::::=> "+id);
    this.upDoc = this.afs.doc(`${FIREBASE_CONFIG.UserProfile}/${id}`);
    this.upDoc.delete();

  }  

}
