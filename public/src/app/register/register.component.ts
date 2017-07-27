import { Component, OnInit, ElementRef, NgZone, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AlertService, UsersService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  model: any = {};
  loading = false;

  public latitude: number;
  public longitude: number;
  public address: string;
  public zoom: number;  
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,    
    private router: Router,
    private usersService: UsersService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.latitude = 10.772057;
    this.longitude = 106.698333;
    this.zoom = 12;
    this.searchControl = new FormControl();
    this.autoComplete();    
  }

  register() {
    this.loading = true;
    this.model.lat = this.latitude;
    this.model.lng = this.longitude;
    this.model.address = this.address;
    console.log(this.model);
    // this.usersService.upsert(this.model)
    //     .subscribe(
    //       data => {
    //         this.alertService.success('Resgistration successful', true);
    //         this.router.navigate(['/login'])
    //       },
    //       error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //       }
    //     )
  }

  private autoComplete() {

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set address, latitude, longitude and zoom
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }    

}
