import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../services/project.service";
import { UserControllerService } from "../../services/user-controller.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {CustomConfigs} from "../../config/config";


@Component({
  selector: 'app-project-part-submission',
  templateUrl: './project-part-submission.component.html',
  styleUrls: ['./project-part-submission.component.css']
})
export class ProjectPartSubmissionComponent implements OnInit {

  task: any;


  link:String;
  comment:String;
  //submission id
  id:String;

  project_id:String;

  baseUrl :String;
  loaderGIF:String;
  ifLoaded:boolean = false;


  constructor(private router: Router,
    private routerParameter: ActivatedRoute,
    private userService: UserControllerService,
    private projectService: ProjectService,
    private flashMessages: FlashMessagesService,private configs:CustomConfigs) {
      
    this.baseUrl = configs.getBaseURL();
    this.loaderGIF = this.baseUrl + "assets/images/loader.gif";

     }

    

  ngOnInit() {

    //authguard can also be implemented for good practice
    if (!this.userService.isLoggedIn()) {
      //if not logined in
      this.router.navigate(['login'])
    } else {

      this.routerParameter.params.subscribe(params => {
        console.log(params)
        let type = params['type'];
        let id = params['id'];
        this.id = id
        if (type == undefined || id == undefined) {
          this.router.navigate(["dashboard"]);
        } else {
          //this.project_id = localStorage.getItem("currentProject");
          //localStorage.removeItem("currentProject");
         //alert(this.project_id)
          this.projectService.getPartbyType(type, id).subscribe(data => {

            //console.log(data);
            if (data.success) {
              this.task = data.part;
              this.ifLoaded = true;
            } else {
              this.flashMessages.show(data.msg, { cssClass:"alert-danger", timeout:3000 });
            }
          })
        }

      })
    }

  }


  submitTask(){

    //console.log("this is test");
    

    if(this.link == undefined || this.link.length < 5){
        this.flashMessages.show("Please Enter Proper Submission Link",{ cssClass:"alert-danger", timeout:3000 });
    }else{
        //if everything is in place;
        //do the submission
        this.projectService.submitProject(this.link,this.comment,this.id).subscribe(data =>{

          if(data.success){
              //if success
              this.flashMessages.show(this.task.task_name + " submitted",{cssClass:"alert-success",timeout:3000});
              this.router.navigate(['/project/learn/' + this.task.project_id]);
          }else{
            this.flashMessages.show(data.msg,{cssClass:"alert-danger",timeout:3000});
          }


        })

    }

  }
  

}
