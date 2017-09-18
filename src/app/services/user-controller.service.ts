import { Injectable } from '@angular/core';
import {Http, Headers} from  "@angular/http";
import "rxjs/add/operator/map";

import {ValidationService} from "../services/validation.service";
import {tokenNotExpired} from "angular2-jwt";
import { CustomConfigs} from "../config/config";


@Injectable()
export class UserControllerService {

  token:string;
  userData:any;

 api:String;

  constructor(private http:Http,configs:CustomConfigs) {
      this.api = configs.getAPIURL();
      //console.log(this.api);
   }

  registerUser(user){
    let headers =  new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.api + "user/create",user,{headers: headers})
    .map(response=>response.json());

  }

  loginUser(details){
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.api + "user/login",details,{headers: headers})
    .map(response=>response.json());
  }

  storeLocalUserData(token,userData){
    this.token =token;
    this.userData =userData;
    localStorage.setItem("token",this.token);
    localStorage.setItem("user",JSON.stringify(userData));
  }

  getToken(){
    return localStorage.getItem("token");
  }
  
  logOutUser(){
      this.token=null;
      this.userData=null
      localStorage.clear();
  }

  //check if logged in 
  isLoggedIn(){

    return tokenNotExpired("token");

  }


  loadDashBoard(){
    let header = new Headers();
    header.append("Content-Type","application/json");
    //console.log(this.token);
    let token = this.getToken();
    header.append("Authorization",token);
    return this.http.get(this.api + "user/dashboard",{headers:header})
    .map(response=>response.json());
  }

}
