import { Component, OnInit, ElementRef, NgZone, ViewChild  } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { NursesService } from '../../_services/index';
import { maxAge, minAge } from '../../_directives/index';

@Component({
  selector: 'app-nurse-edit',
  templateUrl: './nurse-edit.component.html',
  styleUrls: ['./nurse-edit.component.css']
})
export class NurseEditComponent implements OnInit {

  nurse = {};

  requireAlert:string = 'Cần điền thông tin';
  minPassAlert:string = 'Mật khẩu phải nhiều hơn 5 ký tự';
  minPhoneAlert:string = 'Số điện thoại cần đúng 11 chữ số';
  maxPhoneAlert:string = 'Số điện thoại cần đúng 11 chữ số';
  maxAgeAlert:string = 'cần nhỏ hơn 49 tuổi';
  minAgeAlert:string = 'cần lớn hơn 21 tuổi';
  emailAlert:string = 'Cần điền đúng email';

  public latitude: number;
  public longitude: number;
  public address: string;
  public zoom: number;
  public searchControl: FormControl;
  reactiveForm: FormGroup;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private nursesService: NursesService,
    private formBuilder: FormBuilder
  ) { 
    this.reactiveForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': '',
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
      'rate': [null, Validators.required],
      'retribution': [null, Validators.required],      
    })
  }

  ngOnInit() {
    this.getNurse(this.route.snapshot.params['id']);
    this.latitude = 10.772057;
    this.longitude = 106.698333;
    this.zoom = 12;
    this.searchControl = new FormControl();
    this.autoComplete();    
  }

  getNurse(id) {
    this.nursesService.getById(id).subscribe(nurse => {
      this.nurse = nurse;
      console.log("Nurse ", nurse);
    });
  }

  editNurse(value: any) {
    console.log('Reactive Form Data: ')
    console.log(value);
    this.nurse = {
      id: this.route.snapshot.params['id'],
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
      type: value.type,
      rate: value.rate,
      retribution: value.retribution
    };
    this.nursesService.upsert(this.nurse).subscribe(result => {
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
