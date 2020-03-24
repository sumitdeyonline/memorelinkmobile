import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';

@Component({
  selector: 'jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss'],
})
export class JobdetailsComponent implements OnInit {
  id: any;
  public pjob: PostJobc;
  travelReq: string;
  
  constructor(private _activeRoute:ActivatedRoute, private postservice: PostjobService,private router: Router) { 


  }

  ngOnInit() {

    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      //console.log("Key Value :::::::: "+this.id);
    });    
    this.postservice.getPostJobsById(this.id).subscribe(pjob=> {
      this.pjob = pjob;
      //alert(this.pjob.isTeleComute);
      if (this.pjob.isTeleComute == true) {
        this.travelReq = "Work from home available";
      } else {
        this.travelReq = "Work from home not available";
      }
      //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
      //console.log("List Service ..... 33333 ::::: "+this.pjob.Compensation);
    })


  }


  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    //console.log("Get Time :::::::===> "+dateIput.toDate().getTime());
    //alert("Last Modifed Date :::::: "+this.pjob.LastModifiedDate);
    //return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }

  onApply() {
    console.log("Apply Job");
    this.router.navigate(['/applyjob',this.id]);

  }

}
