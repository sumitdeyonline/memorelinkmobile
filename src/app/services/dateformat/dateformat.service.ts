import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DateformatService {

  monthsFull = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
    ];

  constructor() { } 
  
  monthNumToSigName(monthnum) {
    // console.log("Months :::: "+monthnum);
    // console.log("Months ::::....1 "+ this.months[monthnum - 1]);
    return this.months[monthnum - 1] || '';
  }

}
