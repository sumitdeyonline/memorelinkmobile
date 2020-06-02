import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { PostJobc } from '../postjob/postjob.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { ListJob } from './listjob';
import * as algoliasearch from 'algoliasearch';
import { isNumeric } from 'rxjs/util/isNumeric';
import { PagerService } from 'src/app/services/common/pager.service';
import { DateformatService } from 'src/app/services/dateformat/dateformat.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { LocationService } from 'src/app/services/location/location.service';
import { NearestCityDetails } from './nearestcity.model';
import { CityDetails } from './city.model';

@Component({
  selector: 'app-listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.scss'],
})

//export class ListjobComponent implements OnInit {
export class ListjobComponent {  
    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  keyword: string;
  location: string;

  PostJobc: PostJobc[];
  public folder: string;
  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;
  form;
  listjob = new ListJob();
  client: any;
  index: any;
  loading: boolean = false;

  noResultFound:string='';
    // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];


  cityModel: CityDetails;
  allCityUS = [];

  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  //jobs = [];
  pagesize = SEARCH_CONFIG.PAGE_SIZE;
  mobile: boolean=false;




  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private pagerService: PagerService,  
              public dformat: DateformatService,
              private locserv: LocationService) {
    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.keyword = params['keyword'];
      //console.log("Keyword " + this.keyword);
      this.location = params['location'];
      //console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);
      //console.log("Keyword : "+this.keyword+" Localtion : "+this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
      this.getPostJobsAlgolia(this.keyword,this.location);
    })


   }


   loadData(event, pagenumber) {
    setTimeout(() => {
      //console.log('Done');
      this.setPage(pagenumber);
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.PostJobc.length == 50) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  // ngOnInit() {}


  getPostJobsAlgolia(keyword, location) {

    /****** Need to open Later ********/
       this.noResultFound = '';
       this.PostJobc= [];
       this.pagedItems=[];
       this.pager = {};
       
       this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
         { protocol: SEARCH_CONFIG.PROTOCOLS });
   
         let filter = 'isSearchable:true', state='', city='';
         // let filter = '', state='', city='';
         //this.PostJobc = [];
         this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
   
         //console.log(" keyword :::: "+keyword+"location :::: "+location);
         //this.SpinnerService.show(); 
         this.loading = true;
         let locationLocal = location.trim();
         let keywordLocal = keyword.trim();
         if ((keywordLocal == "") && (locationLocal == "")) {
           //console.log("Nothing ... ");
           this.index.search({
             filters: filter
           }).then((data) => {
             //let j=0;
             //this.PostJobcFinal = [];
             this.PostJobc = data.hits;
   
             //console.log("All Data" +this.PostJobc[0].CompanyLogoURL);
             if (this.PostJobc.length == 0)  {
               this.notfoundAnything();
             }
             // this.SpinnerService.hide();
             this.loading = false; 
             this.setPage(1);
           });        
         } else {
           if ((keywordLocal != "") || (locationLocal != "")) {
             if (locationLocal != "") {
     
               if (isNumeric(locationLocal)) {
                 //console.log("This is number");
                 this.getZipCodeSearch(locationLocal,keywordLocal);
                 filter = 'JobZip:'+locationLocal+' AND isSearchable:true';
                 /* Zipcode location service */
                 // this.locserv.getCityState(location).subscribe((data)=>{
                 //   console.log(data);
                 //   city = data['city'];
                 //   state = data['state'];
                 //   console.log("City ::::: "+city+"   State :::::: "+state);
                 // });
     
                 
     
     
               } else {
     
                 // Separated out state and city 
                 if (locationLocal.indexOf(",") > -1) {
                   state = this.isNull(locationLocal.split(",")[1].trim());
                   city = this.isNull(locationLocal.split(",")[0].trim());
                 } else {
                   city = this.isNull(locationLocal.trim());
                   state="";
                 }
                 
               
     
                 if ((state !="") && (city !="")) {
   
                   //console.log("City state")
                   this.getCityStateSearch(city, state,keywordLocal);
                   //console.log("City state 1")
   
                   //filter = 'JobCity:"'+city+'" AND JobState:"'+state+'"';
                   } 
                   else if ((state == "") && (city !="")) {

                     filter = 'JobCity:"'+city+'"';
                     this.executeSearchFunction(keywordLocal,filter);
                   } else if ((state != "") && (city =="")){
                     filter = 'JobState:"'+state+'"';
                     this.executeSearchFunction(keywordLocal,filter);
                  } else {
                   //filter ='JobCity:"'+city+'" OR JobState:"'+state+'"';
                   // filter ='JobCity:"'+city+'"';
                   //this.executeSearchFunction(keywordLocal,filter);
                     filter ='';
                     this.executeSearchFunction(keywordLocal,filter);
                 }
                 // console.log("Filter :::: "+filter);
                 // console.log("keyword  :::: "+keywordLocal);              
               }
             } else {
               filter ='';
               this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
             }
             
    
           //console.log("Filter :::::: => "+filter);
     
             // if (filter == '') {
             //   this.index.search({
             //     query: keywordLocal
       
             //   }).then((data) => {
             //     //let j=0;
             //     //this.PostJobcFinal = [];
             //     this.PostJobc = data.hits;
             //     //console.log("No City State");
             //     //this.SpinnerService.hide(); 
             //     this.loading = false; 
             //     this.setPage(1);
             //   });
             // } else  {
       
             //   this.index.search({
             //     query: keywordLocal,
             //     filters: filter
             //   }).then((data) => {
             //     //let j=0;
             //     //this.PostJobcFinal = [];
             //     this.PostJobc = data.hits;
             //     //this.SpinnerService.hide(); 
             //     //console.log("City or State");
             //     this.loading = false; 
             //     this.setPage(1);
       
             //   });
       
             // }
   
   
           }
         }
   
     }
   
     getZipCodeSearch(zipcode,keywordLocal) {
       //let getCcZipity  = new ZipCityState();
       //let getCity = SEARCH_CONFIG.GET_CITY_WITH_ZIP+zipcode;
       //console.log("Zip URL :::: "+getCity);
       //this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
       //this.http.get(getCity,{responseType: 'json'}).subscribe((data: any[]) => {
         this.locserv.getCityStateFromZip(zipcode).subscribe((data: any[]) => {  
         // this.http.get(getCityID,{responseType: 'json',headers: headers})
         //          .map((data: any[]) => {
     
           const array = JSON.parse(JSON.stringify(data)) as any[];
           //console.log(array);
   
           this.getCityStateSearch(array['city'],array['state'],keywordLocal);
   
       });
   
     }
   
     getCityStateSearch(city, state,keywordLocal) {
       let cityD = new CityDetails();
       let check:boolean=false; 
       //console.log("this.cityModel.city");
       //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
       // let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID+"&limit=20&offset=0&hateoasMode=false";
       // //console.log("this.cityModel.city  ::: "+getCityID);
       //this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
         this.locserv.getCityStateSearch(city).subscribe((data: any[]) => {
   
         // this.http.get(getCityID,{responseType: 'json',headers: headers})
   
       //          .map((data: any[]) => {
   
         const array = JSON.parse(JSON.stringify(data)) as any[];
         //console.log(array['data']);
   
         for(let i=0;i<array['data'].length;i++) {
           cityD = array['data'][i];
   
           if ((cityD.type.toLocaleUpperCase() == 'CITY') 
               && (cityD.countryCode.toUpperCase() == 'US')
               && (cityD.regionCode.toUpperCase() == state.toUpperCase())
               && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {
   
                 // console.log("ID : "+cityD.id);
                 // console.log("City : "+cityD.city);
                 // //console.log("name : "+this.cityModel.name);
                 // console.log("countryCode : "+cityD.countryCode);
                 // console.log("regionCode : "+cityD.regionCode);
                 check=true;
   
                 this.getNearByCities(cityD.id,city, state,keywordLocal);
                 return;
           }
         }
         if (!check)
           this.getCitySearhOnly(array,city, state,keywordLocal);
         return;
   
       });
       // .toPromise();
   
     }
   
     getCitySearhOnly(array,city, state,keywordLocal) {
       //console.log("City only ::: ");
       let filter = 'JobCity:"'+city+'"';
       this.executeSearchFunction(keywordLocal,filter)
   
       // let cityD = new CityDetails();
       // for(let i=0;i<array['data'].length;i++) {
       //   cityD = array['data'][i];
   
       //   if ((cityD.type.toLocaleUpperCase() == 'CITY') 
       //       && (cityD.countryCode.toUpperCase() == 'US')
       //       && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {
   
       //         //console.log("ID : "+cityD.id);
       //         // console.log("City : "+cityD.city);
       //         // //console.log("name : "+this.cityModel.name);
       //         // console.log("countryCode : "+cityD.countryCode);
       //         // console.log("regionCode : "+cityD.regionCode);
   
       //         this.getNearByCities(cityD.id,city, state,keywordLocal);
       //         return;
       //   }
       // }
       // this.notfoundAnything()
     }
   
     notfoundAnything() {
       this.noResultFound = "No Record Found";
       this.loading = false; 
   
     }
   
     getNearByCities(cityID,city, state,keywordLocal) {
       let ncityD = new NearestCityDetails();
       //let filter = '(JobCity:"'+city+'" AND JobState:"'+state+'")';
       let filter = '((JobCity:"'+city+'")';
   
       //console.log("this.cityModel.city");
       //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
       //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"/"+cityID+"/nearbyCities?radius=100&limit=20&offset=0&hateoasMode=false&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID;
       //console.log("this.cityModel.city  ::: "+getCityID);
       //this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
         this.locserv.getNearByCities(cityID).subscribe((data: any[]) => {
         // this.http.get(getCityID,{responseType: 'json',headers: headers})
         //          .map((data: any[]) => {
     
           const array = JSON.parse(JSON.stringify(data)) as any[];
           //console.log("Nearest City ::: "+array);
           
           for(let i=0;i<array['data'].length;i++) {
             filter = filter+' OR (JobCity:"'+ncityD.city+'")';
             //filter = filter+' OR (JobCity:"'+ncityD.city+'" AND JobState:"'+ncityD.regionCode+'")';
             ncityD = array['data'][i];
             //  console.log("ID : "+ncityD.id);
             //  console.log("City : "+ncityD.city);
             //  console.log("City : "+ncityD.regionCode);
             // console.log("City : "+ncityD.distance);
           }
           filter = filter+') AND (JobState:"'+state+'")';
           //console.log("filter ::: "+filter);
           this.executeSearchFunction(keywordLocal,filter);
   
       });
       return;
     }
   
     executeSearchFunction(keywordLocal,filter) {
   
       if (filter == '') {
         //console.log("filter ::: Blank "+filter);
         this.index.search({
           query: keywordLocal,
           filters: 'isSearchable:true'
         }).then((data) => {
           //let j=0;
           //this.PostJobcFinal = [];
           this.PostJobc = data.hits;
           //console.log("No City State");
           //this.SpinnerService.hide(); 
           if (this.PostJobc.length == 0)  {
             this.notfoundAnything();
           }
           this.loading = false; 
   
           this.setPage(1);
         });
       } else  {
         filter = filter+" AND isSearchable:true"
        // console.log("filter ::: "+filter);
         this.index.search({
           query: keywordLocal,
           filters: filter
         }).then((data) => {
           //let j=0;
           //this.PostJobcFinal = [];
           this.PostJobc = data.hits;
           //this.SpinnerService.hide(); 
           //console.log("City or State");
           if (this.PostJobc.length == 0)  {
             this.notfoundAnything();
           }
           this.loading = false; 
           this.setPage(1);
   
         });
   
       }
     }

  isNull(value) {
    if (value == null) { return "" }
    else { return value }
  }

  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }

  setPage(page: number) {
    //console.log("Page Count");
    //window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.PostJobc.length, page);
    //console.log("Page Count...1  ::: "+this.PostJobc.length);
    // get current page of items
    this.pagedItems = this.PostJobc.slice(0, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);


    
  }




}