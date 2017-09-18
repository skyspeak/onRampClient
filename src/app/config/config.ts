import { Injectable } from '@angular/core';
@Injectable()
export class CustomConfigs{

    private apiURL:String= "https://whispering-forest-40948.herokuapp.com/api/";
    private baseURL:String="https://pacific-headland-22092.herokuapp.com/";

    getAPIURL(){
        return this.apiURL;
    }

    getBaseURL(){
        return this.baseURL;
    }

}