import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserControllerService} from "../../services/user-controller.service"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userController:UserControllerService,private router:Router) { }

  ngOnInit() {
  }

  logoutUser(){
    this.userController.logOutUser();  
    this.router.navigate(["/login"]);
    return false;  
  }

}
