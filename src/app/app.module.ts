import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule, Http } from "@angular/http";
import { UrlSerializer } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Custom Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectComponent } from "./components/project/project.component"
import { ProjectlistingComponent } from './components/projectlisting/projectlisting.component';
import { ProjectLearnComponent } from './components/project-learn/project-learn.component';
import { ProjectPartSubmissionComponent } from './components/project-part-submission/project-part-submission.component';


//Custom Services Import
import { ValidationService } from "./services/validation.service";
import { UserControllerService } from "./services/user-controller.service";
import { ProjectService } from "./services/project.service";
import {AuthGuard} from "./guard/auth.guard"
import { CustomConfigs} from "./config/config";

//Importing External Modules
import { FlashMessagesModule } from "angular2-flash-messages";
import { TruncateModule } from 'ng2-truncate';
import { CustomUrlSerializerService } from "./services/custom-url-serializer.service";

const appRoutes: Routes = [

  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent , canActivate: [AuthGuard] },
  { path: "projects", component: ProjectlistingComponent },
  { path: "project", component: ProjectComponent },
  { path: "project/:id", component: ProjectComponent },
  { path: "project/learn", component: ProjectLearnComponent ,canActivate: [AuthGuard] },
  { path: "project/learn/:type/:id", component: ProjectPartSubmissionComponent ,canActivate: [AuthGuard] },
  { path: "project/learn/:id", component: ProjectLearnComponent ,canActivate: [AuthGuard] },




]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProjectlistingComponent,
    ProjectComponent,
    ProjectLearnComponent,
    ProjectPartSubmissionComponent,

    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    NgbModule.forRoot()
    
  ],
  providers: [ValidationService, UserControllerService, ProjectService, { provide: UrlSerializer, useClass: CustomUrlSerializerService } ,AuthGuard,CustomConfigs],
  bootstrap: [AppComponent]
})
export class AppModule { }
