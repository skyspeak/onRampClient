import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { CustomConfigs } from "../config/config";
import { UserControllerService } from "../services/user-controller.service"

@Injectable()
export class ProjectService {

  api: String;
  //api:String="http://localhost/upwork/flex/flexAdmin/api/";

  constructor(private http: Http, private userService: UserControllerService, configs: CustomConfigs) {
    this.api = configs.getAPIURL();
    //console.log(this.api);
  }

  getAllProjects() {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    return this.http.get(this.api + "projects/all", { headers: header })
      .map(response => response.json());

  }

  getProjectById(id, isEnrolled = false) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    if (isEnrolled) {
      console.log("token test to see the compelted ");
       let params = new URLSearchParams();
       let token =  this.userService.getToken();
      params.append("token", token)
      return this.http.get(this.api + "projects/" + id + "?token=" + token,{ headers: header})
        .map(response => response.json());
    } else {
      return this.http.get(this.api + "projects/" + id, { headers: header })
        .map(response => response.json());
    }
  }

  enrollProject(project_id) {
    let token = this.userService.getToken();
    //console.log(token);
    let header = new Headers();
    header.append("Content-Type", "application/json");
    //header.append("Authorization","token");
    header.append("Authorization", token);
    return this.http.post(this.api + "projects/enroll", { id: project_id }, { headers: header })
      .map(response => response.json());

  }

  getPartbyType(type: string, id: string) {

    let token = this.userService.getToken();

    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", token);
    return this.http.get(this.api + "projects/parts/" + type + "/" + id, { headers: header })
      .map(response => response.json());
  }



  submitProject(link: String, comment: String = "", id: String) {
    let token = this.userService.getToken();

    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", token);
    return this.http.post(this.api + "projects/parts/task/submit", { link: link, comment: comment, id: id }, { headers: header }).map(response => response.json());


  }

  isEnrolled(project_id: String) {
    let token = this.userService.getToken();
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", token);

    return this.http.get(this.api + "projects/enrolled/" + project_id, { headers: header })
      .map(response => response.json());

  }

}
