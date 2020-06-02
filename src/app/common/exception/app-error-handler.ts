import { AppError } from './app-error';
//import { LogService } from './../../services/dataservice/logger/logger.service';

import { ErrorHandler } from '@angular/core';
//import { LogComponent } from "../logger/log.component";

export class AppErrorHandler implements ErrorHandler {
    constructor() { }
    handleError(error) {
        let errorVal = { logdetails: error, logdate: (new Date).toString(), errorType: 'General', category: 'Home', createdBy: 'Sumit'  }
        //this.createLog(errorVal);  /// create entry to log table
           // alert('App Error Handler ::: An unexpected error occurred');
            //console.log(error);

    } 

    // createLog(logger) {
    //     this.service.create(logger)
    //       .subscribe(
    //         newlog => {
    //           logger['id'] = newlog.id;
    //           console.log("Log Message : "+newlog.json());
    //         },
    //         (error: AppError) => {
    //           console.log("Error ........");
    //         }
    //       )
    //   }

}