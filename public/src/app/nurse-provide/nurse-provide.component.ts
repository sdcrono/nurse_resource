import { Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { User, NurseProfile, Location, ContractModel } from '../_models/index';
import { Nurse, Contract } from '../_interfaces/index';
import { AlertService, NursesService, MarkersService, ContractsService } from '../_services/index';
import {Observable} from 'rxjs/Observable';
import {} from '@types/googlemaps';

@Component({
  moduleId: module.id,  
  // selector: 'app-nurse-provide',
  templateUrl: './nurse-provide.component.html',
  styleUrls: ['./nurse-provide.component.css'],
  providers: [MarkersService]
})
export class NurseProvideComponent implements OnInit {

  //nurses: NurseProfile[] = [];
  currentUser: User;
  nurses: Nurse[] = [];
  public locations: Location;

  //Start Position
  public latitude: number;
  public longitude: number;

  //Search form
  public searchControl: FormControl;

  //Time
  whatTime: number;
  ahuhu: string;

  //Zoom level
  public zoom: number;
  public icon : string;

  //values
  markerNo: number;
  markerName: string;
  markerLat: number;
  markerLng: number;
  markerDraggable: boolean;
  markerDescription: string;

  //Markers
  markers: marker[] = [
    // {
    //   name: 'Nurse1',
    //   lat: 10.793581,
    //   lng:  106.678031,
    //   draggable: true
    // },
    // {
    //   name: 'Nurse2',
    //   lat: 10.845614,
    //   lng: 106.777996,
    //   draggable: true
    // },
    // {
    //   name: 'Nurse3',
    //   lat: 10.783160,
    //   lng: 106.664787,
    //   draggable: true
    // },
  ];


  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpModule,
    private router: Router,
    private alertService: AlertService,
    private nursesService: NursesService,
    private markerService: MarkersService,
    private contractsService: ContractsService
  ) { }

  ngOnInit() {

    //get current user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //set google maps defaults
    this.zoom = 12;
    this.latitude = 10.847171;
    this.longitude = 106.786956;

    //create search FormControl
    this.searchControl = new FormControl();

    // this.whatTime = Observable.interval(1000).map(x => new Date()).share();
    // this.whatTime = Date.now();
    this.ahuhu = "Date.now()";
    console.log("Now:" + this.whatTime);

    //set current position
    this.setCurrentPosition();

    this.loadAllNurseOnTheMap();

    //load Places Autocomplete
    this.autoComplete();

  }

  clickedMarker(marker: marker, index: number) {
    console.log("Clicked marker " + marker.name + ' at index ' + index + ' with lat ' + marker.lat + ' lng ' + marker.lng);
    this.markerNo = marker.no;
    this.markerName = marker.name;
    this.markerLat= marker.lat;
    this.markerLng = marker.lng;
    this.markerDraggable = marker.draggable;
  }

  mapClicked($event: any) {
    console.log("Clicked map");
    let newMarker = {
      no: -1,
      name: 'Untitle',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker);
  }

  markerDragEnd(marker: any, $event: any) {
    console.log("dragEnd ", marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

  }

  chooseMarker() {
    // event.preventDefault();
    console.log("Choosing nurse is " + this.nurses[this.markerNo].username + ' at index ' + this.markerNo);
    // let choosingNurse= {
    //   userId: this.currentUser._id,
    //   nurseId: this.nurses[this.markerNo].id,
    //   created_at: "2017-12-11",
    //   end_at: "2017-12-12"
    // }
    // console.log("ahuhu" + choosingNurse.toString());
    let contract = new ContractModel(this.currentUser._id, this.nurses[this.markerNo].id, new Date(Date.now()), new Date("2017-12-12"));
    this.contractsService.create(contract).subscribe(
                data => {
                    this.alertService.success('Make a contract successful', true);
                    this.ahuhu ="123";
                    // this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.ahuhu ="456";
                    // this.loading = false;
                });
  }

  private autoComplete() {

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

    private loadAllNurseOnTheMap() {
      let dem = 0;
        this.nursesService.search().subscribe(nurses => { 
          // this.nurses = nurses;
          // this.nurses.forEach(nurse => {
          //   console.log("Nurse ", nurse);
          //   console.log("location ", this.locations);
          //   // let nurseMarker = {
          //   //   name: nurse.username,
          //   //   lat: +nurse.location.latitude.toString(),
          //   //   lng: +nurse.location.longitude.toString(),
          //   //   draggable: false
          //   // }
          //   var locationss = new Location();
          //   locationss= Object.assign({}, nurse.location);
          //   let nurseMarker = {
          //     name: nurse.username,
          //     lat: locationss.latitude,
          //     lng: locationss.longitude,
          //     draggable: false
          //   }

            this.nurses = nurses;
            nurses.forEach(nurse => {
            console.log("Nurse ", nurse);
            console.log("location ", nurse.location.latitude.toString());
            let nurseMarker = {
              no: dem,
              name: nurse.username,
              lat: nurse.location.latitude,
              lng: nurse.location.longitude,
              draggable: false
            }
            dem++;
            console.log("Nurse Marker ", nurseMarker);
            this.markers.push(nurseMarker);
          });  
        });
    }


  
}


  interface marker {
    no: number;
    name?: string;
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    animation?: any;
}