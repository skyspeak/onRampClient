import { Injectable } from '@angular/core';
@Injectable()
export class CustomConfigs{

    private apiURL:String= "https://onrampadmin.herokuapp.com/api/";
    private baseURL:String="https://onrampclient.herokuapp.com/";

    getAPIURL(){
        return this.apiURL;
    }

    getBaseURL(){
        return this.baseURL;
    }

}
