import { Component, OnInit } from '@angular/core';
import { EMAIL_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  email: string;
  emailid: string;
  constructor() { }

  ngOnInit() {
    this.email = "mailto:"+EMAIL_CONFIG.HelpEmail+"?Subject=Feedback";
    this.emailid = EMAIL_CONFIG.HelpEmail;
  }

}
