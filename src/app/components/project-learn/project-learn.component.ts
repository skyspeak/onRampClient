import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ProjectService } from "../../services/project.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { UserControllerService } from "../../services/user-controller.service"
import {CustomConfigs} from "../../config/config";


@Component({
  selector: 'app-project-learn',
  templateUrl: './project-learn.component.html',
  styleUrls: ['./project-learn.component.css']
})
export class ProjectLearnComponent implements OnInit {

  project_id: string;
  projectData: any;
  projectParts: any;

  baseUrl :String;
  loaderGIF:String;
  ifLoaded:boolean = false;

  totalParts:number;
  totalPartsCompleted:number=0;

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
        this.router.navigate(['dashboard']);
      }

      this.project_id = params['id'];
      //localStorage.setItem("currentProject",this.project_id);

    });
    console.log(this.userService.getToken());
    console.log(this.project_id);
    this.projectService.getProjectById(this.project_id,true).subscribe(data => {
      console.log(data)
      if (data.success) {
        console.log(data.data.projectData);
        this.projectData = data.data.projectData;
        this.projectParts = data.data.partData.partData;
        //console.log(this.projectParts.length);
        this.totalParts = this.projectParts.length;
        for(let x =0 ; x< this.totalParts;x++){
          let currentPart = this.projectParts[x].completed
          if(currentPart){
              this.totalPartsCompleted +=1; 
          }

        }

        if(this.totalParts == this.totalPartsCompleted){
          this.flashMessages.show("Project Completed. Continue Your Journey in Seeking Knowledge",{cssClass:"alert-success",timeout:10000});
        }

        console.log(this.totalPartsCompleted)
        this.ifLoaded = true;
        console.log(data.data);
      } else {
        console.log(data);
        //or show a 404 error pages
        this.flashMessages.show(data.msg, { cssClass: "alert-danger", timeout: 3000 })
      }


    })

  }

}
