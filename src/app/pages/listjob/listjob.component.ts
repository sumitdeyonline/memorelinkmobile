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


    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


  constructor(private router: Router, private route: ActivatedRoute, private pagerService: PagerService,  public dformat: DateformatService) {
    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.keyword = params['keyword'];
      //console.log("Keyword " + this.keyword);
      this.location = params['location'];
      //console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);
      console.log("Keyword : "+this.keyword+" Localtion : "+this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
      this.getPostJobsAlgolia(this.keyword,this.location);
    })


   }


   loadData(event, pagenumber) {
    setTimeout(() => {
      console.log('Done');
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
   
       this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
         { protocol: SEARCH_CONFIG.PROTOCOLS });
   
         let filter = '', state='', city='';
         this.PostJobc = [];
         this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);
   
         //console.log(" keyword :::: "+keyword+"location :::: "+location);
   
         if ((keyword.trim() == "") && (location.trim() == "")) {
           //console.log("Nothing ... ");
           this.index.search({
           }).then((data) => {
             //let j=0;
             //this.PostJobcFinal = [];
             this.PostJobc = data.hits;
             this.setPage(1);
           });        
         } else {
           if ((keyword.trim() != "") || (location.trim() != "")) {
             if (location.trim() != "") {
     
               if (isNumeric(location)) {
                 //console.log("This is number");
                 filter = 'JobZip:'+location;
     
                 /* Zipcode location service */
                 // this.locserv.getCityState(location).subscribe((data)=>{
                 //   console.log(data);
                 //   city = data['city'];
                 //   state = data['state'];
                 //   console.log("City ::::: "+city+"   State :::::: "+state);
                 // });
     
     
     
     
               } else {
     
                 if (location.indexOf(",") > -1) {
                   state = this.isNull(location.split(",")[1].trim());
                   city = this.isNull(location.split(",")[0].trim());
                 } else {
                   city = this.isNull(location.trim());
                 }
     
     
                 if ((state !="") && (city !="")) {
                   filter = 'JobCity:'+city+' AND JobState:'+state;
                 } else if ((state == "") && (city !="")) {
                   filter = 'JobCity:'+city;
                 } else if ((state != "") && (city =="")){
                   filter = 'JobState:'+state;
                 } else {
                   filter ='';
                 }
      
               }
             } else {
               filter ='';
             }
     
     
     
     
           //console.log("Filter :::::: => "+filter);
     
           if (filter == '') {
             this.index.search({
               query: keyword
     
             }).then((data) => {
               //let j=0;
               //this.PostJobcFinal = [];
               this.PostJobc = data.hits;
               this.setPage(1);
             });
           } else  {
     
             this.index.search({
               query: keyword,
               filters: filter
             }).then((data) => {
               //let j=0;
               //this.PostJobcFinal = [];
               this.PostJobc = data.hits;
               this.setPage(1);
     
             });
     
           }
           }
         }
   
   
   
   /****** End *******/

   
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
      console.log("Page Count...1  ::: "+this.pagedItems.length);


      
    }




}
