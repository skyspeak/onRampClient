import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserControllerService } from "../../services/user-controller.service"

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomConfigs} from "../../config/config";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project_id: string;
  projectData: any;
  projectParts: any;

  baseUrl :String;
  loaderGIF:String;
  ifLoaded:boolean = false;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private flashMessages: FlashMessagesService,
    private userService: UserControllerService,private configs:CustomConfigs) {
      
    this.baseUrl = configs.getBaseURL();
    this.loaderGIF = this.baseUrl + "assets/images/loader.gif";

     }
  ngOnInit() {

    this.route.params.subscribe(params => {

      if (params['id'] == undefined) {
        this.router.navigate(['projects']);
      }

      this.project_id = params['id'];

      if(this.userService.isLoggedIn()){
        console.log("test");
        this.projectService.isEnrolled(this.project_id).subscribe(data=>{
         // console.log("inside response")
          //console.log(data)
          if(data.success){
            this.router.navigate(["/project/learn/" + this.project_id]);
          }

        })
      }
      
    });
  
    console.log(this.userService.getToken());
    console.log(this.project_id);
    this.projectService.getProjectById(this.project_id).subscribe(data => {
      console.log(data)
      if (data.success) {
        this.ifLoaded = true;
        console.log(data.data.projectData);
        this.projectData = data.data.projectData;
        this.projectParts = data.data.partData.partData;

        console.log(this.projectParts);
      } else {
        console.log(data);
        //or show a 404 error pages
        this.flashMessages.show(data.msg, { cssClass: "alert-danger", timeout: 3000 })
      }


    })

  }

  enrollProject() {

    if (!this.userService.isLoggedIn()) {
      this.flashMessages.show("Login to continue", { cssClass: "alert-danger", timeout: 3000 });
      this.router.navigate(['login'])
    } else {

      //alert(this.project_id + " " +  "enrolled")
      this.projectService.enrollProject(this.project_id).subscribe(data => {
        console.log(data);
        if (data.success) {
          //alert("registered");

          this.flashMessages.show("Enrolled to project " + this.projectData.project_name,{cssClass:"alert-success",timeout:5000})
          this.router.navigate(['/project/learn/' + this.project_id]);
        } else {
          alert(data.msg);
          this.flashMessages.show(data.msg, { cssClass: "alert-danger", timeout: 3000 });
          return false;
        }

      })
    }

  }

}
