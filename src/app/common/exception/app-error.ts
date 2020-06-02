//import { LogService } from './../../services/dataservice/logger/logger.service';
//

export class AppError {
    constructor(public originalError?: any) {
        //let logger: LogComponent;
        let errorVal = { logdetails: originalError, logdate: (new Date).toString(), errorType: 'General', category: 'Home', createdBy: 'Sumit'  }
        //this.createLog(errorVal);  /// create entry to log table
            alert('An unexpected error occurred');
            console.log(originalError);
        
        alert("Error - AppError : "+originalError);
    }
 
    // createLog(errorVal) {
    //     console.log("EROORRRRRRRRRRRRRR......2");
    //     console.log("EROORRRRRRRRRRRRRR......2.1");
    //     this.service.create(errorVal)
    //       .subscribe(
    //         newlog => {
    //             console.log("EROORRRRRRRRRRRRRR......2.3");
    //           errorVal['id'] = newlog.id;
    //           console.log("Log Message : "+newlog.json());
    //         },
    //         (error: AppError) => {
    //           console.log("Error ........");
    //         }
    //       )
    //   }    
}