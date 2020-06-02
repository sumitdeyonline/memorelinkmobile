import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commondialog',
  templateUrl: './commondialog.component.html',
  styleUrls: ['./commondialog.component.css']
})
export class CommondialogComponent implements OnInit {

  isCreated: boolean = true;
  routePage: string;
  Status: string
  userMessageTag:string='';

  constructor(private dialogRef: MatDialogRef<CommondialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
                window.scroll(0,0);
    }

  ngOnInit() {
    window.scroll(0,0);
    // console.log("This Data ::::::: -> > " +this.data.split("|")[0]);
    // console.log("This Data 2::::::: -> > " +this.data.split("|")[1]);

    //console.log("This Data ::::::: -> > " +this.data);

    let ID = this.data.split("||");
    this.Status = ID[0];
    this.routePage = ID[1];
    if (ID[2] !=null)
      this.userMessageTag = ID[2];
    // console.log("This Data ::::::: 2 -> > " +ID[0]);
    // console.log("This Data ::::::: route -> > " +ID[1]);

    // if ((ID[0] === null) || (ID[0] === '')) {
    //   console.log("Entry ::::::::======>>>>");
    //   this.isCreated = false;
    // }
  }

  close() {
    this.dialogRef.close();
    this.router.navigate([this.routePage]);
    window.scroll(0,0);
  }

}
