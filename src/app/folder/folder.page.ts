import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { isNumeric } from 'rxjs/util/isNumeric';
import 'rxjs/add/operator/map';
//import { ListJob } from './listjob';
import { SEARCH_CONFIG } from '../global-config';

//import { PostJobc } from './postjob.model';
////import {isNumeric} from 'rxjs/util/isNumeric';
import { PagerService } from '../services/common/pager.service';
import { DateformatService } from '../services/dateformat/dateformat.service';
import { CityDetails } from '../pages/listjob/city.model';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @Input() keyword: string;
  @Input() location: string;


 // PostJobc: PostJobc[];
  public folder: string;
  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;
  form;
  //listjob = new ListJob();
  client: any;
  index: any;
  searchvar =[];
  locationval='';
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    // pager object
    //pager: any = {};

    // paged items
    //pagedItems: any[];


  constructor(private activatedRoute: ActivatedRoute, 
              fb: FormBuilder, 
              private pagerService: PagerService,  
              public dformat: DateformatService, 
              private router: Router,
              private locserv: LocationService) { 
    //window.scroll(0,0);
    this.form = fb.group({
      keyword: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  searchjob(jobsearchComponent) {
    
    if (jobsearchComponent.keyword === undefined) { jobsearchComponent.keyword =""; }
    if (jobsearchComponent.location === undefined) { jobsearchComponent.location =""; }
    //console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    //this.getPostJobsAlgolia(jobsearchComponent.keyword,jobsearchComponent.location);

    this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });


    //console.log("Page Items :::: "+this.pagedItems[0].JobTitle);
    //this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });
  }

  zipcodeSearch(localtionval) {
    let getcity='';
    let array=[];
    let cityD : CityDetails;
    // this.locserv.getCityStateFromZip(zipcode).then(() => {
    //   this.UploadResumeProfileBulk(uname,ResumeURL,ResumeFileName,contenttype,csvRecords); 
    // });
    //console.log("Zipcode :: "+zipcode);
   // console.log("XXXX==> : "+this.searchvar);

    if (localtionval.length > SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD) {
      let inputval = localtionval.trim();
      if (isNumeric(inputval)) {

        this.locserv.getCityStateFromZip(inputval).subscribe((data: any[])=>{ 
            this.searchvar = [data['city']+","+data['state']];
            //console.log("Get value : "+this.form.controls['location'].getValue());
            this.location = data['city']+","+data['state'];
            //return ['Livermore,CA'];
            //return [data['city']+","+data['state']];
          });
      } else {
        this.locserv.getCityStateSearch(localtionval).subscribe((data: any[]) => {
          // this.http.get(getCityID,{responseType: 'json',headers: headers})
          //          .map((data: any[]) => {
      
            const array = JSON.parse(JSON.stringify(data)) as any[];
            //console.log(array['data']);
            
            for(let i=0;i<array['data'].length;i++) {
              cityD = new CityDetails();
              cityD = array['data'][i];
              this.searchvar[i] = cityD.city+","+cityD.regionCode;

            }

        })

      }

    }
  }

}
