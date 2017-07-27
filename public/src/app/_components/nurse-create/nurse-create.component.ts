import { Component, OnInit, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { maxAge, minAge } from '../../_directives/index';
import { NursesService } from '../../_services/index';
// import { Nurse } from '../../_models/index';
import "rxjs/add/operator/takeWhile";
import {} from '@types/googlemaps';

@Component({
  moduleId: module.id,
  selector: 'app-nurse-create',
  templateUrl: './nurse-create.component.html',
  styleUrls: ['./nurse-create.component.css']
})
export class NurseCreateComponent implements OnInit {

  nurse: {};
  // requireAlert:string = 'This field is required';
  requireAlert:string = 'Cần điền thông tin';
  minPassAlert:string = 'Mật khẩu phải nhiều hơn 5 ký tự';
  minPhoneAlert:string = 'Số điện thoại cần đúng 11 chữ số';
  maxPhoneAlert:string = 'Số điện thoại cần đúng 11 chữ số';
  maxAgeAlert:string = 'cần nhỏ hơn 49 tuổi';
  minAgeAlert:string = 'cần lớn hơn 21 tuổi';
  emailAlert:string = 'Cần điền đúng email';

  // username: string;
  // password: string;
  // firstname: string;
  // lastname: string;
  // email: string;
  // phone: number;
  // age: number;
  // gender: string;
  // address: string;
  // certification: string;
  // career: string;
  // hospital: string;
  // type: string;
  public latitude: number;
  public longitude: number;
  public address: string;
  public zoom: number;
  public searchControl: FormControl;
  reactiveForm: FormGroup;
  private alive: boolean = true;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private nursesService: NursesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.reactiveForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      'age': [null, Validators.compose([Validators.required, maxAge(48), minAge(22)])],
      'gender': [null, Validators.required],
      'address': [null, Validators.required],
      'certification': [null, Validators.required],
      'career': [null, Validators.required],
      'hospital': [null, Validators.required],
      'type': [null, Validators.required],
    })
  }

  ngOnInit() {
    this.latitude = 10.772057;
    this.longitude = 106.698333;
    this.zoom = 12;
    this.searchControl = new FormControl();
    this.autoComplete();
  }

  ngOnDestroy() {
    this.alive = false;
  }
  
  saveNurse(value: any) {
    console.log('Reactive Form Data: ')
    console.log(value);
    this.nurse = {
      username: value.username,
      password: value.password,
      lat: this.latitude,
      lng: this.longitude,
      name: value.name,
      email: value.email,
      phone: value.phone,
      age: value.age,
      gender: value.gender,
      address: this.address,
      certification: value.certification,
      career: value.career,
      hospital: value.hospital,
      type: value.type
    };
    this.nursesService.upsert(this.nurse).takeWhile(() => this.alive).subscribe(result => {
      let id = result.text();
      console.log(id);
      this.router.navigate(['/nurses/', id]);
    }, err => {
      console.log(err);
    });
    console.log("Nurse " + this.nurse);

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
