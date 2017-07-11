import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UsersService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  model: any = {}
  loading = false;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.usersService.create(this.model)
        .subscribe(
          data => {
            this.alertService.success('Resgistration successful', true);
            this.router.navigate(['/login'])
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        )
  }

}
