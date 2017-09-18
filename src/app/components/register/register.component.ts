import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

// Custom Services
import { ValidationService } from "../../services/validation.service"
import { UserControllerService } from "../../services/user-controller.service"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //convert as User Object Later on
  firstName: String;
  lastName: String;
  password: String;
  email: String;
  username: String;
  interests: String;


  constructor(
    private userController: UserControllerService,
    private validator: ValidationService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {


  }

  userRegister() {
    const registerUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      //username: this.username,
      email: this.email,
      //interests:this.interests
    }

    //Where the Logic Happens for validation

    if (!this.validator.isRegisterFormValid(registerUser)) {
      this.flashMessage.show("Fill all fields", { cssClass: "alert-danger", timeout: 3000 });
      return false;
    }

    if (!this.validator.isEmailValid(registerUser.email)) {

      this.flashMessage.show("Invalid email format", { cssClass: "alert-danger", timeout: 3000 });
      return false;
    }


    if (!(this.password.length > 5)) {

      this.flashMessage.show("Password should be more that 5 Characters", { cssClass: "alert-danger", timeout: 3000 });
      return false;

    }

    this.userController.registerUser(registerUser).subscribe(response => {

      if (response.success) {

        this.flashMessage.show(response.msg, { cssClass: "alert-success", timeout: 3000 });
        this.router.navigate(['login']);

      } else {

        this.flashMessage.show(response.msg, { cssClass: "alert-danger", timeout: 3000 });

      }

    });


  }
}
