import { AppError } from './../exception/app-error';
//import { LogService } from './../../services/dataservice/logger/logger.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  //constructor(private service: LogService) { }
  constructor() { }

  ngOnInit() {
  }

  // createLog(logger) {
  //   this.service.createLogg(logger)
  //     .subscribe(
  //       newlog => {
  //         logger['id'] = newlog.id;
  //         console.log("Log Message : "+newlog.json());
  //       },
  //       (error: AppError) => {
  //         console.log("Error ........");
  //       }
  //     )
  // }

}
