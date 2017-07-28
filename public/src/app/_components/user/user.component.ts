import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/index';
import { UsersService } from '../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;

  users: any;

  constructor(
    private usersService: UsersService
  ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
      users.forEach(user => {
        console.log("User ", user);
      });
    });
  }

  deactive(id: any) {
    let req = {
      id: id
    };
    console.log(id);
    this.usersService.delete(req).subscribe(result => {
        console.log(result);
    }, err => {
      console.log(err);
    });
  }

}
