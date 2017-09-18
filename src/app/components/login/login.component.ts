import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import {ValidationService} from "../../services/validation.service";
import {UserControllerService} from "../../services/user-controller.service"
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:string;
  password:string;
  
  constructor(
              private validator:ValidationService,
              private flashMessage:FlashMessagesService,
              private userController:UserControllerService,
              private router:Router) { }

  ngOnInit() {
  }

  userLogin(){
      console.log("this is login");

      let loginDetails = {
        email:this.email,
        password:this.password
      }

      if(!this.validator.isLoginFormValid(loginDetails)){
          this.flashMessage.show("Fill all fields",{cssClass:"alert-danger",timeout:3000});
          return false;
      }
      
      this.userController.loginUser(loginDetails).subscribe(data=>{
        console.log(data)

        if(!data.success){
              this.flashMessage.show(data.msg,{cssClass:"alert-danger",timeout:3000});
              return false;
        }else{
          
          //login was successful
           this.userController.storeLocalUserData(data.token,data.user);
           this.router.navigate(["dashboard"]);

        }

        

        
         
        


        

      });

     
  }
}
