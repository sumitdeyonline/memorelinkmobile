import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
//import { ListJob } from './listjob';
import { SEARCH_CONFIG } from '../global-config';

//import { PostJobc } from './postjob.model';
////import {isNumeric} from 'rxjs/util/isNumeric';
import { PagerService } from '../services/common/pager.service';
import { DateformatService } from '../services/dateformat/dateformat.service';

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


    // pager object
    //pager: any = {};

    // paged items
    //pagedItems: any[];


  constructor(private activatedRoute: ActivatedRoute, fb: FormBuilder, private pagerService: PagerService,  public dformat: DateformatService, private router: Router) { 
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
    console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    //this.getPostJobsAlgolia(jobsearchComponent.keyword,jobsearchComponent.location);

    this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });


    //console.log("Page Items :::: "+this.pagedItems[0].JobTitle);
    //this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });
  }



}
