import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
@Injectable()
export class ValidationService {

  constructor(private http:Http) { }

  //checks if all fields are filled
  isRegisterFormValid(user){

    if(user.firstName == undefined || user.lastName ==  undefined || user.email == undefined || user.password ==  undefined){
    //if(user.firstName == undefined || user.lastName ==  undefined || user.username ==  undefined || user.email == undefined || user.password ==  undefined){
      return false;
    }else{
      return true;
    }

  }

  //check for a valid email format
  isEmailValid(email){
  
  //from stackoverflow
  var validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validator.test(email);

  }

  //need to implement
  //isvalidemail 
  //isvalid usernae

  isLoginFormValid(details){

    if(details.email == undefined || details.password == undefined){
    //if(details.username == undefined || details.password == undefined){
      return false;
    }else{
      return true;
    }
 }

  //login function 
 authenticateUser(){

 }


}
