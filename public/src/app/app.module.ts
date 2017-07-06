import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users.service';

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
    PostsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
