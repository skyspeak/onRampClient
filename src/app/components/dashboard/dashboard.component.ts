import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserControllerService } from "../../services/user-controller.service"
import { FlashMessagesService } from "angular2-flash-messages";
import { CustomConfigs } from "../../config/config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: any;
  msg: string = "";
  hasProject: boolean = false;

  baseUrl: String;
  loaderGIF: String;
  ifLoaded: boolean = false;


  constructor(private router: Router,
    private userService: UserControllerService,
    private flashMessage: FlashMessagesService, private configs: CustomConfigs) {

    this.baseUrl = configs.getBaseURL();
    this.loaderGIF = this.baseUrl + "assets/images/loader.gif";

  }
  ngOnInit() {

    if (!this.userService.isLoggedIn()) {
      //if not logged in
      this.flashMessage.show("Login to continue", { cssClass: "alert-danger", timeout: 3000 });
      this.router.navigate(['login']);


    } else {
      //if logged in
      this.userService.loadDashBoard().subscribe(data => {
        console.log("this  is a test");
        console.log(data);
        if (data.success) {
          this.projects = data.projects;
          this.hasProject = true;
          this.ifLoaded = true;
          //console.log(this.projects);
        } else {
          this.hasProject = false;
        }

      })

    }
  }

}
