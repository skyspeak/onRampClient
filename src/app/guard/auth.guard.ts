import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router"
import { UserControllerService } from "../services/user-controller.service"

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: UserControllerService ,private router:Router) {

    }

    canActivate(){
           if(this.authService.isLoggedIn()){
               return true
           }else{
               this.router.navigate(['/login']);
               return false;
           }
    }

}