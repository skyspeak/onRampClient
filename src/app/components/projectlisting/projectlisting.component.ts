import { Component, OnInit} from '@angular/core';

import {CustomConfigs} from "../../config/config";

import {ProjectService} from "../../services/project.service";
import {FlashMessagesService} from "angular2-flash-messages";



@Component({
  selector: 'app-projectlisting',
  templateUrl: './projectlisting.component.html',
  styleUrls: ['./projectlisting.component.css']
})
export class ProjectlistingComponent implements OnInit {

  projects:any; 

  baseUrl :String;
  loaderGIF:String;
  ifLoaded:boolean = false;

  constructor(private projectService:ProjectService,private flashMessage:FlashMessagesService,configs:CustomConfigs) {
    this.baseUrl = configs.getBaseURL();
    this.loaderGIF = this.baseUrl + "assets/images/loader.gif";
    //console.log(this.baseUrl)
    //console.log(this.loaderGIF)
   }

  ngOnInit() {
  
    this.projectService.getAllProjects().subscribe(data=>{

      if(data.success){
          this.ifLoaded = true;
          let numberOfProjects =  Object.keys(data.data).length

          if(numberOfProjects > 0){
              this.projects = data.data;
              console.log(this.projects)
          }else{
            this.flashMessage.show("No projected add so far",{cssClass:"alert-danger",timeout:5000});
          
          }
      }else{
          this.flashMessage.show(data.response,{cssClass:"alert-danger",timeout:3000})
      }

    });
  
  }

}
