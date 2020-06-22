import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { EmailService } from 'src/app/services/email/email.service';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { AngularUtilityComponent } from 'src/app/common';
//import './../../../../assets/js/smtp.js'; 

@Component({
  selector: 'applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss'],
})
export class ApplyjobComponent implements OnInit {
  id: any;
  //@Input('pjob') pjob: PostJobc;
  public pjob: PostJobc;
  applyJobForm: FormGroup;
  selectedFiles: FileList;
  filleUploadEnabled: boolean = false;
  applyJob : ApplyJob;
  checkApplied: boolean = false;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  showUpload: boolean = true;
  email: any;
  applySucessMessage: string = FIREBASE_CONFIG.ApplyJobSucess;
  numberOfResume: Number = 0;
  utility = new AngularUtilityComponent();
  ajobscheck: ApplyJob[];


  constructor(private _activeRoute:ActivatedRoute, 
              private postservice: PostjobService,  
              private fb: FormBuilder,
              private rUploadService: UploadResumeService,
              private ajob: ApplyjobService, 
              private sEmail: EmailService) {
    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      //console.log("Key Value :::::::: "+this.id);
    }); 
   }

  ngOnInit() {

      this.postservice.getPostJobsById(this.id).subscribe(pjob=> {
        this.pjob = pjob;
        if (this.pjob == null) {
          //console.log("null");
        } else {
          //console.log("not null");
        }
        //  console.log("Test...."+ this.pjob.ApplyToEmail);
        //  console.log("Test...."+ this.pjob.JobTitle);  
        //  console.log("Test...."+ this.pjob.id);  
  
      })
      
      this.applyJobForm =  this.fb.group({
        FirstName: [null, Validators.required],
        LastName: [null, Validators.required],
        Email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        //PhoneNumber: [null, [Validators.required, Validators.pattern('[0-9]{10}')]],
        //PhoneNumber: [null, [Validators.required, Validators.pattern('[0-9]{3}?[-. ]?[0-9]{3}?[-. ]?[0-9]{4}')]],
        PhoneNumber: [null, [Validators.required]],
        CoverLetter:[null],
        // fileUpload: [Validators.required],
        // fileUploadExist: [null]
      });

      this.checkApplied = false;
      this.rUploadService.downloadURLTempResume = '';     



  }

  // applyNow() {
  //   console.log("First Name ::: "+this.applyJobForm.get('FirstName').value);
  //   console.log("Last Name ::: "+this.applyJobForm.get('LastName').value);
  //   console.log("FromEmail ::: "+this.applyJobForm.get('Email').value);
  //   console.log("Phone Number ::: "+this.applyJobForm.get('PhoneNumber').value);
  //   console.log("CoverLetter ::: "+this.applyJobForm.get('CoverLetter').value);
  // }

  applyNow(){
    //console.log(this.applyJobForm);
    //console.log("Download URL :::::::: "+this.rUploadService.downloadURLTempResume);
    //console.log("First Name ::: "+this.applyJobForm.get('FirstName').value);
    let username ='anonymous';

    // if (this.auth.isAuthenticated()) {
    //   username = this.auth.userProfile.name;
    // }
    //this.applyJob = new ApplyNow[];
     //this.applyJob.FirstName = applynowform.FirstName;
     this.applyJob = { FirstName: this.applyJobForm.get('FirstName').value,
                       LastName: this.applyJobForm.get('LastName').value,
                       FromEmail: this.applyJobForm.get('Email').value,
                       ApplyToEmail: this.pjob.ApplyToEmail,
                       CCToEmail:  this.pjob.CCToEmail,
                       ApplyToURL: this.pjob.ApplyToURL,
                       PhoneNumber: this.applyJobForm.get('PhoneNumber').value,
                       CoverLetter: this.applyJobForm.get('CoverLetter').value,
                       fileUploadURL: this.rUploadService.downloadURLTempResume,
                       JobID: this.id,
                       JobTitle: this.pjob.JobTitle,
                       username : username,
                       joblocation: this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry,
                       company: this.pjob.Company,
                       CreatedDate: new Date()
                     };


      let checkEmail='';
      checkEmail = this.applyJobForm.get('Email').value;



      this.ajob.getApplyJobByUserJobIDCandidateTakeOne(checkEmail,this.pjob.id).subscribe(ajob=>{
        this.ajobscheck = ajob; 
        //console.log("this.ajobscheck ::: "+this.ajobscheck.length);
        if (this.ajobscheck.length == 0) {


            this.applyJob = { FirstName: this.applyJobForm.get('FirstName').value,
            LastName: this.applyJobForm.get('LastName').value,
            FromEmail: this.applyJobForm.get('Email').value,
            ApplyToEmail: this.pjob.ApplyToEmail,
            CCToEmail:  this.pjob.CCToEmail,
            ApplyToURL: this.pjob.ApplyToURL,
            PhoneNumber: this.applyJobForm.get('PhoneNumber').value,
            CoverLetter: this.applyJobForm.get('CoverLetter').value,
            fileUploadURL: this.rUploadService.downloadURLTempResume,
            JobID: this.pjob.id,
            JobIDSerial:this.pjob.JobID,
            JobTitle: this.pjob.JobTitle,
            username : username,
            joblocation: this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry,
            company: this.pjob.Company,
            CreatedDate: new Date()
          };

          this.ajob.addUpdateApplyJobs(this.applyJob);

          // let filename='';
          // if (this.auth.isAuthenticated()) {
          //   for (let i=0;i<this.uResume.length;i++) {
          //     if (this.applyJob.fileUploadURL.toLowerCase() == this.uResume[i].ResumeURL) {
          //       filename = this.uResume[i].ResumeFileName;
          //       //console.log("File Name :::: "+filename);
          //       break;
          //     }
          //   }
          // } 

 
      
          // Candidate Job Email 
          let subject = 'You have applied for: '+this.pjob.JobTitle;
          let body = 'Thank you <b>'+checkEmail+'</b>  for applying for the job.<br/></br> <b>Job Title: </b> '+this.pjob.JobTitle+' <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Job Description : </b>'+this.pjob.JobDesc+'  <br><br> <b>Thank you <br>MemoreLink Team</b>'
          this.sEmail.sendEmail(checkEmail,'',subject,body,'job');
          
          // Recruiter Job Email 
      
          let vJobSublect =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+' has applied for the job '+this.pjob.JobTitle;
          let vBody =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+ ' has applied for the job <br/> <br/> <b>Candidate Email: </b>'+checkEmail+
                    '  <br/> <b>Candidate Phone: </b>'+this.applyJobForm.get('PhoneNumber').value+
                    '  <br/> <b>Cover Letter : </b>'+this.applyJobForm.get('CoverLetter').value+
                    ' <br /> <b>Resume  : </b><a href="'+this.applyJob.fileUploadURL+'">Resume Link</a><br>'+
                    '  <br /> <b>Job Title: </b>'+this.pjob.JobTitle+
                    '  <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+
                    ' <br /><b>Job Description : </b>'+this.pjob.JobDesc+
                    ' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'
          this.sEmail.sendEmail(this.pjob.ApplyToEmail,'',vJobSublect,vBody,'job');
      
          if ((this.pjob.CCToEmail != null) && (this.pjob.CCToEmail != undefined)) {
            if (this.pjob.CCToEmail.trim() !='') {
              this.sEmail.sendEmail(this.pjob.CCToEmail,'',vJobSublect,vBody,'job');
            } else {
              //console.log("No CC email");
            }
          }
    

        } else {
          this.applySucessMessage = "You have applied this job("+this.pjob.JobTitle+") already";
        }
        this.checkApplied = true;
      });


                     
      //console.log("First Name "+this.applyJobForm);
      // console.log("Job ID "+this.id);

      // console.log("User name ::: "+this.applyJob.username);
      // console.log("Created Date ::: "+this.applyJob.CreatedDate);
      // console.log("Download URL ::: "+this.applyJob.fileUploadURL);
      // console.log("Apply To Eemail :::: "+this.pjob.ApplyToEmail);

      // this.ajob.addUpdateApplyJobs(this.applyJob);
      // this.checkApplied = true;

  /* Email Start */

    // let uploadResume = '';
    // if ((this.rUploadService.downloadURLTempResume == null) || (this.rUploadService.downloadURLTempResume == undefined)) {
    //   uploadResume = this.uResume[0].ResumeFileName;
    // } else {
    //   uploadResume = 
    // }
    // let subject = 'Your job has been applyed('+this.pjob.JobTitle+')';
    // let body = '<i>Your job has been applied</i> <br><br> <b>Job Title: </b> '+this.pjob.JobTitle+' <br /> <b>joblocation: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Job Description : </b>'+this.pjob.JobDesc+' <br />  <br><br> <b>Thank you <br>MeMoreLink Team</b>'
    // this.sEmail.sendEmail(this.applyJobForm.get('Email').value,'',subject,body);
    
    // let vJobSublect =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+' has applied the job('+this.pjob.JobTitle+')';
    // let vBody ='<i>'+this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+ ' has applied this job</i> <br/> <br/> <b>Candidate Email: </b>'+this.applyJobForm.get('Email').value+'  <br/> <b>Candidate Phone: </b>'+this.applyJobForm.get('PhoneNumber').value+'  <br /> <b>Job Title: </b>'+this.pjob.JobTitle+'  <br /> <b>joblocation: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Cover Letter : </b>'+this.applyJobForm.get('CoverLetter').value+' <br /> <b>Resume  : </b><a href="'+this.applyJob.fileUploadURL+'">Resume Link</a> <br /><b>Job Description : </b>'+this.pjob.JobDesc+' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'
    // this.sEmail.sendEmail(this.pjob.ApplyToEmail,'',vJobSublect,vBody);

    // if ((this.pjob.CCToEmail != null) && (this.pjob.CCToEmail != undefined)) {
    //   if (this.pjob.CCToEmail.trim() !='') {
    //     this.sEmail.sendEmail(this.pjob.CCToEmail,'',vJobSublect,vBody);
    //   } else {

    //   }
    // }

    // let filename='';
    // for (let i=0;i<this.uResume.length;i++) {
    //   if (this.applyJob.fileUploadURL.toLowerCase() == this.uResume[i].ResumeURL) {
    //     filename = this.uResume[i].ResumeFileName;
    //     break;
    //   }
    // }

          // Candidate Job Email 
          // let subject = 'You have applied for: '+this.pjob.JobTitle;
          // let body = 'Thank you <b>'+this.applyJobForm.get('Email').value+'</b>  for applying for the job.<br/></br> <b>Job Title: </b> '+this.pjob.JobTitle+' <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Job Description : </b>'+this.pjob.JobDesc+'  <br><br> <b>Thank you <br>MemoreLink Team</b>'
          // this.sEmail.sendEmail(this.applyJobForm.get('Email').value,'',subject,body,'job');
          
          // // Recruiter Job Email 
      
          // let vJobSublect =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+' has applied for the job '+this.pjob.JobTitle;
          // let vBody =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+ ' has applied for the job <br/> <br/> <b>Candidate Email: </b>'+this.applyJobForm.get('Email').value+
          //           '  <br/> <b>Candidate Phone: </b>'+this.applyJobForm.get('PhoneNumber').value+
          //           '  <br/> <b>Cover Letter : </b>'+this.applyJobForm.get('CoverLetter').value+
          //           ' <br /> <b>Resume  : </b><a href="'+this.applyJob.fileUploadURL+'">Resume Link</a><br>'+
          //           '  <br /> <b>Job Title: </b>'+this.pjob.JobTitle+
          //           '  <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+
          //           ' <br /><b>Job Description : </b>'+this.pjob.JobDesc+
          //           ' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'
          // this.sEmail.sendEmail(this.pjob.ApplyToEmail,'',vJobSublect,vBody,'job');
      
          // if ((this.pjob.CCToEmail != null) && (this.pjob.CCToEmail != undefined)) {
          //   if (this.pjob.CCToEmail.trim() !='') {
          //     this.sEmail.sendEmail(this.pjob.CCToEmail,'',vJobSublect,vBody,'job');
          //   } else {
          //     //console.log("No CC email");
          //   }
          // }


        // Candidate Job Email 
        // let subject = 'You have applied for: '+this.pjob.JobTitle;
        // let body = 'Thank you <b>'+this.applyJobForm.get('Email').value+'</b>  for applying for the job.<br/></br> <b>Job Title: </b> '+this.pjob.JobTitle+' <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'  <br /> <b>Resume  : </b><a href="'+this.applyJob.fileUploadURL+'">Resume Link</a><br><br /> <b>Job Description : </b>'+this.pjob.JobDesc+' <br><br> <b>Thank you <br>MemoreLink Team</b>'
        // this.sEmail.sendEmail(this.applyJobForm.get('Email').value,'',subject,body);
        
        // // Recruiter Job Email 
    
        // let vJobSublect =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+' has applied for the job '+this.pjob.JobTitle;
        // let vBody =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+ ' has applied for the job <br/> <br/> <b>Candidate Email: </b>'+this.applyJobForm.get('Email').value+
        //           '  <br/> <b>Candidate Phone: </b>'+this.applyJobForm.get('PhoneNumber').value+
        //           '  <br/> <b>Cover Letter : </b>'+this.applyJobForm.get('CoverLetter').value+
        //           ' <br /> <b>Resume  : </b><a href="'+this.applyJob.fileUploadURL+'">Resume Link</a><br>'+
        //           '  <br /> <b>Job Title: </b>'+this.pjob.JobTitle+
        //           '  <br /> <b>Job Location: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+
        //           ' <br /><b>Job Description : </b>'+this.pjob.JobDesc+
        //           ' <br />  <br><br> <b>Thank you <br>MemoreLink Team</b>'
        // this.sEmail.sendEmail(this.pjob.ApplyToEmail,'',vJobSublect,vBody);
    
        // if ((this.pjob.CCToEmail != null) && (this.pjob.CCToEmail != undefined)) {
        //   if (this.pjob.CCToEmail.trim() !='') {
        //     this.sEmail.sendEmail(this.pjob.CCToEmail,'',vJobSublect,vBody);
        //   } else {
        //     //console.log("No CC email");
        //   }
        // }



  }

  upload() {
    const file = this.selectedFiles.item(0);
    //console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
      this.currentFileUpload = new FileUpload(file);
      //let filePath =`${FIREBASE_CONFIG.TempResume}/${"Resume_"+this.currentFileUpload.file.name.replace(".","_")}`;
      //console.log("https://firebasestorage.googleapis.com/v0/b/jobsite-c8333.appspot.com/o"+filePath+"?alt=media");
      this.rUploadService.pushTempResumeStorage(this.currentFileUpload, this.progress);
      //console.log("Download URL "+this.rUploadService.downloadURLTempResume);

    } else {
      //this.isNewUpload = false;
      this.selectedFiles = undefined;
      this.filleUploadEnabled = false;
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    //console.log("Selected Files ........"+this.selectedFiles);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      //console.log("Upload file........");
      this.filleUploadEnabled = true;
    } else {
      this.filleUploadEnabled = false;
    }
  }
  
  validateFile(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    //console.log("EXTESTION :::::::$$$&&&&&&& "+ext);
    if ((ext.toLowerCase() == 'doc') || (ext.toLowerCase() == 'docx') || (ext.toLowerCase() == 'pdf') || (ext.toLowerCase() == 'ppt') || (ext.toLowerCase() == 'pptx')) {
      return true;
    } else {
      return false;
    }

  }

  onChange(event) {
    //console.log("Select Value ::: "+event);
    if (event=='') {
      this.showUpload = true;
      this.rUploadService.downloadURLTempResume = '';
    } else {
      this.rUploadService.downloadURLTempResume = event;
      this.showUpload = false;
    }

  }

  phoneNumberFormat(phone) {
    //console.log("Phone : "+phone);
    //this.applyJobForm.setValue(this.utility.formatUSNumber(phone):'PhoneNumber').value = this.utility.formatUSNumber(phone);
    this.applyJobForm.controls['PhoneNumber'].setValue(this.utility.formatUSNumber(phone));
  }


}
