import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { AlertService, UsersService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  model= {};
  loading = false;

  constructor(   
    private router: Router,
    private usersService: UsersService,
    private alertService: AlertService) { }

  ngOnInit() {
    
  }

  register() {
    // this.loading = true;
    console.log(this.model);
    // this.usersService.register(this.model)
    //     .subscribe(
    //       data => {
    //         console.log(data)
    //         this.alertService.success('Resgistration successful', true);
    //         this.router.navigate(['/login'])
    //       },
    //       error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //       }
    //     )
    // this.usersService.upsert(this.model).subscribe(result => {
    //   this.loading = false;
    //   let id = result.text();
    //   console.log(id);
    //   this.router.navigate(['/login']);
    // }, err => {
    //   this.loading = false;
    //   console.log(err);
    // });     
  }
  

}
