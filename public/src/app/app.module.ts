//  AIzaSyAepYGvisNRywBmOOV3d2_T-9wPBZVy9gM 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AgmCoreModule } from "@agm/core";
import { NgDateRangePickerModule } from 'ng-daterangepicker';

import { PostsComponent } from './posts/posts.component';
import { PostsService } from './_services/posts.service';
import { UsersComponent } from './users/users.component';
// import { UsersService } from './_services/users.service';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { HomeComponent } from './home/home.component';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UsersService, NursesService, ContractsService, GlobalEventsManager, NavbarService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NurseProvideComponent } from './nurse-provide/nurse-provide.component';
import { NavbarComponent, JumbotronComponent, NurseComponent, NurseDetailComponent, NurseCreateComponent, NurseEditComponent, UserComponent, 
  UserDetailComponent, UserCreateComponent, UserEditComponent, ContractComponent, ContractDetailComponent, ProfileComponent } from './_components/index';



// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'nurse',
    pathMatch: 'full'
  },
  {
    path: 'nurse',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    // PostsComponent,
    // UsersComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    NavMenuComponent,
    NurseProvideComponent,
    NavbarComponent,
    JumbotronComponent,
    NurseComponent,
    NurseDetailComponent,
    NurseCreateComponent,
    NurseEditComponent,
    UserComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    ContractComponent,
    ContractDetailComponent,
    ProfileComponent  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAepYGvisNRywBmOOV3d2_T-9wPBZVy9gM',
      libraries: ["places","geometry"]
      // language: 'vi',
      // region: 'VI' 
    }),
    NgDateRangePickerModule,
    // RouterModule.forRoot(ROUTES)
    routing
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    GlobalEventsManager,
    NavbarService,
    UsersService,
    NursesService,
    ContractsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
