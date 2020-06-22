import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { CityDetails } from 'src/app/pages/listjob/city.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  headers = new HttpHeaders({
    // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
    "x-rapidapi-host": SEARCH_CONFIG.GEODB_API_HOST,
    "x-rapidapi-key": SEARCH_CONFIG.GEODB_API_KEY    
    // 'Accept': "application/ms-word"
  });

  constructor(private http: HttpClient) { }

  // getCityState(zipcode) {
  //   let ApiURL = SEARCH_CONFIG.ZIPCODE_API_URL+SEARCH_CONFIG.ZIPCODE_API+'/info.json/'+zipcode;
  //   return this.httpClient.get(ApiURL);
  // }

  getCityStateFromZip(zipcode) {
    //let getCcZipity  = new ZipCityState();
    let getCity = SEARCH_CONFIG.GET_CITY_WITH_ZIP+zipcode;
    let cityState='';
    let array;
    //console.log("Zip URL :::: "+getCity);
    //this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
    return this.http.get(getCity,{responseType: 'json'});
  }



  getCityStateSearch(city) {
    //let cityD = new CityDetails(); 
    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    let getCityURL = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID+"&limit="+SEARCH_CONFIG.MAX_LIMIT_CITY_SEARCH+"&offset=0&hateoasMode=false";
    //console.log("this.cityModel.city  ::: "+getCityID);
    return this.http.get(getCityURL,{responseType: 'json',headers: this.headers})
  }


  getNearByCities(cityID) {
    //let ncityD = new NearestCityDetails();
    //let filter = '(JobCity:"'+city+'" AND JobState:"'+state+'")';

    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    let getCityID = SEARCH_CONFIG.GEODB_API_URL+"/"+cityID+"/nearbyCities?radius="+SEARCH_CONFIG.MAX_LIMIT_REDIUS_SEARCH+"&limit="+SEARCH_CONFIG.MAX_LIMIT_CITY_SEARCH+"&offset=0&hateoasMode=false&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID;
    //console.log("this.cityModel.city  ::: "+getCityID);
    return this.http.get(getCityID,{responseType: 'json',headers: this.headers});
  }

}
