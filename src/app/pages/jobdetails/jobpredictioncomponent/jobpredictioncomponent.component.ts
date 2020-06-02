import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { JobPrediction } from './jobprediction.model';
import { AlphabetNumerology } from 'src/app/services/firebase/alphabetnumerology/alphabetnumerology.model';
import { AlphabetJobPrediction } from 'src/app/services/firebase/alphabetnumerology/alphabetjobprediction.model';
import { JOBPREDICTION_CONFIG } from 'src/app/global-config';
import { EmailService } from 'src/app/services/email/email.service';
import { AlphabetNumerologyService } from 'src/app/services/firebase/alphabetnumerology/alphabet-numerology.service';

@Component({
  selector: 'app-jobpredictioncomponent',
  templateUrl: './jobpredictioncomponent.component.html',
  styleUrls: ['./jobpredictioncomponent.component.scss'],
})
export class JobpredictioncomponentComponent implements OnInit {

  company: string;
  jobPForm: any;
  companyTemp:string='';

  jobPredection = new JobPrediction();
  jobPredectionMessage: string='';
  jobPredectionSucessMessage: string='';
  alphanumerology: AlphabetNumerology[];
  anumerology: AlphabetNumerology;
  alphajobprediction: AlphabetJobPrediction[]
  ajobprediction:AlphabetJobPrediction;
  predection:string ='';

  progress: { percentage: number } = { percentage: 0 };
  progressPercentage:any;
  

  EXECELLENT_MATCH_PERCENTAGE: number = JOBPREDICTION_CONFIG.EXECELLENT_MATCH_PERCENTAGE;
  GOOD_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.GOOD_MATCH_PERCENTAGE;
  AVERAGE_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.AVERAGE_MATCH_PERCENTAGE;
  BAD_MATCH_PERCENTAGE:number= JOBPREDICTION_CONFIG.BAD_MATCH_PERCENTAGE;


  constructor(private _activeRoute:ActivatedRoute, 
    private fb: FormBuilder,
    private sEmail: EmailService,
    private apredection: AlphabetNumerologyService) {

    this._activeRoute.paramMap.subscribe(params => {
      this.company = params.get('company');
      if ((this.company !=undefined) && (this.company !=null))
        this.companyTemp = this.company;
      console.log("this.company :::::::: "+this.companyTemp);

      //console.log("this.company :::::::: "+this.company);
    }); 


  }

  ngOnInit() {

    this.jobPForm = this.fb.group({
      firstname: [null, Validators.required],
      middlename: [null],
      lastname: [null, Validators.required]
      // companyname: [null ,Validators.required]
    });
  }




  jobPrediction(JobPForm : NgForm) {

    this.predection = '';
    let primaryName='', secondaryName='',plusminus='+';
    let primaryCnt=0, secondaryCnt =0;


    if ((JobPForm.value.middlename === undefined) || (JobPForm.value.middlename === null)) {
      JobPForm.value.middlename = '';
    }
    // console.log("First Name :: "+JobPForm.value.firstname);
    // console.log("Middle Name :: "+JobPForm.value.middlename);
    // console.log("Last Name :: "+JobPForm.value.lastname);
    // console.log("Comapny  :: "+JobPForm.value.companyname);
    primaryName = JobPForm.value.firstname.trim().toUpperCase()+JobPForm.value.middlename.trim().toUpperCase()+JobPForm.value.lastname.trim().toUpperCase();
    
    primaryName = primaryName.toUpperCase().replace(/\s/g, "");
    // console.log("Final Name : "+primaryName.toUpperCase());
    //console.log("JobPForm.value.companyname ::: "+JobPForm.value.companyname);
    secondaryName = this.companyTemp.trim().toUpperCase().replace(/\s/g, "");
    //  console.log("Middle Name : "+JobPForm.value.middlename);
    // console.log("Last Name : "+JobPForm.value.lastname);
    //console.log("Company Name : "+secondaryName);            
    this.apredection.getAlphabetValues().subscribe(alphabet => {
      //this.alphanumerology = new AlphabetNumerology();
      this.alphanumerology = alphabet;

      for (let i=0;i < this.alphanumerology.length;i++) {
        this.anumerology = this.alphanumerology[i];
        primaryCnt = primaryCnt + this.CharCount(primaryName,this.anumerology.Alphabet)*this.anumerology.NumValue;
        secondaryCnt = secondaryCnt + this.CharCount(secondaryName,this.anumerology.Alphabet)*this.anumerology.NumValue;
        //console.log("nameCnt : "+nameCnt);
        //console.log("companyCnt : "+companyCnt);
      }
      // console.log("nameCnt :  "+primaryCnt);
      // console.log("companyCnt :  "+secondaryCnt);

      if (primaryCnt == secondaryCnt) {
        // console.log("nameCnt : 2 "+primaryCnt);
        // console.log("companyCnt : 2 "+secondaryCnt);
        this.predection = JOBPREDICTION_CONFIG.EXECELLENT_MATCH;
        this.progressPercentage = this.EXECELLENT_MATCH_PERCENTAGE;
        this.progress.percentage=this.progressPercentage;
        this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+plusminus+")";
      } else {

        while(primaryCnt>9) {
          // console.log("Primary Count ::: "+primaryCnt);
          primaryCnt = this.countRecersive(primaryCnt);
        }

        while(secondaryCnt>9) {
          // console.log("secondaryCnt Count ::: "+secondaryCnt);          
          secondaryCnt = this.countRecersive(secondaryCnt);
        }   
        
        // console.log("nameCnt 2222:  "+primaryCnt);
        // console.log("companyCnt 2222:  "+secondaryCnt);        


        this.apredection.getAlphabetJobPredection(primaryCnt).subscribe(predectionNum => {
          this.alphajobprediction = predectionNum;
          this.ajobprediction = this.alphajobprediction[0];
          // console.log("this.ajobprediction.AlphaNum ::: "+this.ajobprediction.AlphaNum);
          // console.log("this.ajobprediction.GoodNum ::: "+this.ajobprediction.GoodNum);
          // console.log("this.ajobprediction.AvgNum ::: "+this.ajobprediction.AvgNum);
          // console.log("this.ajobprediction.BadNum ::: "+this.ajobprediction.BadNum);

          // console.log("this.ajobprediction.GoodNum,secondaryCnt.toString()::: "+this.ajobprediction.GoodNum,secondaryCnt.toString());

          if (this.CharCount(this.ajobprediction.GoodNum,secondaryCnt.toString()) > 0) {
            // console.log("Good");
            this.predection = JOBPREDICTION_CONFIG.GOOD_MATCH;
            this.progressPercentage =this.GOOD_MATCH_PERCENTAGE;
           // this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"+)";
    
          } else if (this.CharCount(this.ajobprediction.AvgNum,secondaryCnt.toString()) > 0) {
            // console.log("Avg");
            this.predection = JOBPREDICTION_CONFIG.AVERAGE_MATCH;
            this.progressPercentage =this.AVERAGE_MATCH_PERCENTAGE;
            //this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"+)";
          } else if (this.CharCount(this.ajobprediction.BadNum,secondaryCnt.toString())>0) {
            this.predection = JOBPREDICTION_CONFIG.BAD_MATCH;
            this.progressPercentage=this.BAD_MATCH_PERCENTAGE;
            //this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+"-)";
            // console.log("Bad");
          } else {
            this.predection = '';
          }
          this.progress.percentage=this.progressPercentage;
          this.jobPredectionSucessMessage = this.predection+" ("+this.progressPercentage+plusminus+")";
          //console.log("this.progressPercentage "+this.progressPercentage);
          //this.jobPredectionSucessMessage = this.predection+' (Name : '+primaryCnt+' Company : '+secondaryCnt+')';
          // console.log("this.jobPredectionSucessMessage "+this.jobPredectionSucessMessage);
          console.log("progressPercentage : "+this.progressPercentage+ " GOOD_MATCH_PERCENTAGE :: "+this.GOOD_MATCH_PERCENTAGE);
        });

      }

  

      //console.log(this.alphanumerology);
    })
  }



  private countRecersive(val) {
    let countVal=0;
    let valueStr = val.toString();
    // console.log("val ::: "+valueStr);
    for(let i=0;i<valueStr.toString().length;i++) {
      countVal = countVal + Number(valueStr[i]);
      // console.log("countVal :: "+countVal);
      
    }
    return countVal;
  }


  resetForm(jobpForm? : NgForm) {
    //this.signupError='';
    if (jobpForm !=null)
      jobpForm.reset();
    this.jobPredectionMessage ='';
    this.jobPredectionSucessMessage ='';
    this.companyTemp ='';
    //this.close();
    //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
    // SignupComponent.username='';
    // SignupComponent.password='';
    // SignupComponent.repassword='';
    // this.signup = new SignUp();
  }


  Fieldlength(fieldValue: string): number {
    //console.log("FIELD LENGTH .."+fieldValue);
    if (fieldValue == null) {
      return 0;
    } else {
      //console.log("FIELD LENGTH .."+fieldValue.length);
      return fieldValue.length;
    }

  }

  CharCount(str, letter) 
  {
    var letterCount = 0;
    for (var position = 0; position < str.length; position++) 
    {
      if (str.charAt(position) == letter)   {
          letterCount += 1;
      }
    }
    return letterCount;
  }

}
