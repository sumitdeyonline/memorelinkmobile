import { Injectable } from '@angular/core';
import { EMAIL_CONFIG } from 'src/app/global-config';
declare let Email: any;


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(toemail,ccemail, subject,body){
    Email.send({
      // Host : 'smtp.elasticemail.com',
      // Port: '2525',
      // Username : 'memorelink@macgain.com',
      // Password : '2ACCB1CEA84561661BE07F7DE0C25521EC06',
      // To : 'sumitdeyonline@gmail.com',
      // From : 'hr@macgain.com',
  
      SecureToken : EMAIL_CONFIG.SecureToken, // "f28066c5-23af-4d78-bea7-79ef61fe32a5",
      
      //Host : 'smtp.ionos.com',
      //Port: '2525',
      //Username : 'memorelink@macgain.com',
      //Password : 'XXXXXXXXXX',
      To : toemail,
      From : EMAIL_CONFIG.EmailFrom,
  
  
      Subject : subject,
      Body : `
      `+body+`
      `
      // `<i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b> <br /> <b>Email: </b><br /> <b>Subject: </b><br /> <b>Message:</b> <br />  <br><br> <b>~End of Message.~</b> `
      }).then( message => {
        //console.log('Email :: '+message) 
      });
  
    /* Email End */    
  }
}
