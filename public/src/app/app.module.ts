import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

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
import { AlertService, AuthenticationService, UsersService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

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
    NavMenuComponent  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    // RouterModule.forRoot(ROUTES)
    routing
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
