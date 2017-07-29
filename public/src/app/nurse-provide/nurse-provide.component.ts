import { Component, Directive, ElementRef, NgZone, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader, AgmPolygon, LatLngLiteral, LatLngBounds } from '@agm/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { AgmCircle } from '@agm/core/directives/circle';
// import { AgmPolygon } from '@agm/core/directives/polygon';
import { User, Location, ContractModel, ContractDetailModel } from '../_models/index';
import { Nurse, NurseProfile, Contract, Users } from '../_interfaces/index';
import { AlertService, NursesService, MarkersService, ContractsService } from '../_services/index';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/takeWhile";
import {} from '@types/googlemaps';

@Component({
  moduleId: module.id,  
  // selector: 'app-nurse-provide',
  templateUrl: './nurse-provide.component.html',
  styleUrls: ['./nurse-provide.component.css'],
  providers: [MarkersService]
})
export class NurseProvideComponent implements OnInit, OnDestroy, AfterViewInit {

  //nurses: NurseProfile[] = [];
  currentUser: User;
  nurses: Nurse[] = [];
  nurseProfiles: NurseProfile[] = [];
  nurseProfile: NurseProfile;
  public locations: Location;
  // latlngBounds;

  //Start Position for marker and circle
  public latitude: number;
  public longitude: number;
  public address: string;
  public radius: number; //meter
  // yourLatLng;
  

  //Search form
  public searchControl: FormControl;

  //Time
  whatTime: number;
  ahuhu: string;

  //daterangepicker option
  options: NgDateRangePickerOptions;

  //Zoom level
  public zoom: number;
  public icon : string;

  //values
  markerNo: number;
  markerName: string;
  markerEmail: string;
  markerPhone: number;   
  markerSex: string;
  markerAge: string;
  markerAddress: string;
  markerHospital: string;
  markerLat: number;
  markerLng: number;
  markerDraggable: boolean;
  patientName: string;
  patientAge: string;
  patientDescription: string;

  //dateRangePickerValue
  value: string;

  //search options and values
  private selectCareerOption: any;
  private selectTypeOption: any;
  private selectHospitalOption: any;
  private selectMode: any;
  private searchCriteriaCareer: any;
  private searchCriteriaType: any;
  private searchCriteriaHospital: any;
  private searchMode: any;
  private hourOption: any;
  private mon: any;
  private tue: any;
  private wed: any;
  private thu: any;
  private fri: any;
  private sat: any;
  private sun: any;
  private date: string[] = ['','','','','','',''];

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

  pathsSelect: string;
  paths: Array<LatLngLiteral> = [
      { lat: 10.770000,  lng: 106.670000 },
      { lat: 10.770000,  lng: 106.710000 },
      { lat: 10.800000,  lng: 106.710000 },
      { lat: 10.800000,  lng: 106.670000 }
    ];
  pathsCenter: Array<LatLngLiteral> = [
      { lat: 10.770000,  lng: 106.670000 },
      { lat: 10.770000,  lng: 106.710000 },
      { lat: 10.800000,  lng: 106.710000 },
      { lat: 10.800000,  lng: 106.670000 }
    ];

  pathsTop: Array<LatLngLiteral> = [
      { lat: 10.800000,  lng: 106.670000 },
      { lat: 10.800000,  lng: 106.710000 },
      { lat: 10.830000,  lng: 106.710000 },
      { lat: 10.830000,  lng: 106.670000 }
    ];
    
  pathsBottom: Array<LatLngLiteral> = [
      { lat: 10.740000,  lng: 106.670000 },
      { lat: 10.740000,  lng: 106.710000 },
      { lat: 10.770000,  lng: 106.710000 },
      { lat: 10.770000,  lng: 106.670000 }
    ];

  pathsLeft: Array<LatLngLiteral> = [
      { lat: 10.770000,  lng: 106.630000 },
      { lat: 10.770000,  lng: 106.670000 },
      { lat: 10.800000,  lng: 106.670000 },
      { lat: 10.800000,  lng: 106.630000 }
    ];    

  pathsRight: Array<LatLngLiteral> = [
      { lat: 10.770000,  lng: 106.710000 },
      { lat: 10.770000,  lng: 106.750000 },
      { lat: 10.800000,  lng: 106.750000 },
      { lat: 10.800000,  lng: 106.710000 }
    ];   
  //the attribute nhận nhiệm vụ subcribe/unsubcribe
  private alive: boolean = true;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild(AgmCircle)
  public myCircle: AgmCircle;

  @ViewChild(AgmPolygon)
  public myPolygon: google.maps.Polygon;  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpModule,
    private router: Router,
    private alertService: AlertService,
    private nursesService: NursesService,
    private markerService: MarkersService,
    private contractsService: ContractsService
  ) { 
    this.selectCareerOption = [
      {
        id: 1,
        label: "-Select Career-",
        value: ""
      }, {
        id: 2,
        label: "LPN",
        value: "LPN"
      }, {
        id: 3,
        label: "RN",
        value: "RN"
      }
    ];

    this.searchCriteriaCareer = this.selectCareerOption[0];

    this.selectTypeOption = [
      {
        id: 1,
        label: "-Select Type-",
        value: ""
      }, {
        id: 2,
        label: "Internal",
        value: "Internal"
      }, {
        id: 3,
        label: "External",
        value: "External"
      }
    ];

    this.searchCriteriaType = this.selectTypeOption[0];

    this.selectHospitalOption = [
      {
        id: 1,
        label: "-Select Hospital-",
        value: ""
      }, {
        id: 2,
        label: "BỆNH VIỆN AN BÌNH",
        value: "BỆNH VIỆN AN BÌNH"
      }, {
        id: 3,
        label: "BỆNH VIỆN QUÂN DÂN MIỀN ĐÔNG",
        value: "BỆNH VIỆN QUÂN DÂN MIỀN ĐÔNG"
      }, {
        id: 4,
        label: "BỆNH VIỆN BƯU ĐIỆN 2",
        value: "BỆNH VIỆN BƯU ĐIỆN 2"
      }
    ];
    
    this.searchCriteriaHospital = this.selectHospitalOption[0];

    this.selectMode = [
      {
        id: 1,
        label: "-Tìm kiếm xung quanh-",
        value: "nearby"
      }, {
        id: 2,
        label: "-Tìm kiếm theo khu vực-",
        value: "sector"
      }
    ];

    this.searchMode = this.selectMode[0];

    this.hourOption = [
      {
        id: 1,
        label: "-None-",
        value: ""
      }, {
        id: 2,
        label: "sáng: 7h30-10h30",
        value: "sáng: 7h30-10h30"
      }, {
        id: 3,
        label: "chiều: 1h30-4h30",
        value: "chiều: 1h30-4h30"
      }, {
        id: 4,
        label: "tối: 6h-9h",
        value: "tối: 6h-9h"
      }, {
        id: 5,
        label: "cả ngày: 7h30-4h30 (2 ca)",
        value: "cả ngày: 7h30-4h30 (2 ca)"
      }
    ];
    this.mon = this.hourOption[0];
    this.tue = this.hourOption[0];
    this.wed = this.hourOption[0];
    this.thu = this.hourOption[0];
    this.fri = this.hourOption[0];
    this.sat = this.hourOption[0];
    this.sun = this.hourOption[0];
  }

  ngOnInit() {

    //get current user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //set google maps defaults
    console.log("C "+ this.currentUser.lat);
    this.zoom = 13;
    this.latitude = this.currentUser.lat === undefined ? 10.778285 : this.currentUser.lat;
    this.longitude = this.currentUser.lng === undefined ? 106.697806 : this.currentUser.lng;
    this.radius = 5000;
    // this.yourLatLng = new google.maps.LatLng(this.latitude, this.longitude);

    //create search FormControl
    this.searchControl = new FormControl();

    // this.whatTime = Observable.interval(1000).map(x => new Date()).share();
    // this.whatTime = Date.now();
    this.ahuhu = "Date.now()";
    console.log("Now:" + this.whatTime);

    //default option for daterangepicker
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 0
    };

    //set current position
    this.setCurrentPosition();

    //load searched nurses
    // this.loadAllNurseOnTheMap();

    // //fillbound nurse locations to the map
    // this.fillboundAllNurseOnTheMap();

    //load Places Autocomplete
    this.autoComplete();

        //load searched nurses
    this.loadAllNurseOnTheMap();

  }

  clickedMarker(marker: marker, index: number) {
    console.log("Clicked marker " + marker.name + ' at index ' + index + ' with lat ' + marker.lat + ' lng ' + marker.lng);
    this.markerNo = marker.no;
    this.markerName = marker.name;
    this.markerEmail= marker.email;
    this.markerPhone= marker.phone;   
    this.markerSex= marker.sex;
    this.markerAge= marker.age;
    this.markerAddress= marker.address;
    this.markerHospital= marker.hospital;    
    this.markerLat= marker.lat;
    this.markerLng = marker.lng;
    this.markerDraggable = marker.draggable;
    console.log("Clicked user " + this.nurseProfiles[this.markerNo].owner.username + ' at index ' + this.markerNo + ' with lat ' + marker.lat + ' lng ' + marker.lng);
    this.nurseProfile = this.nurseProfiles[this.markerNo];
  }

  click($event: any){
    console.log(`click event is called {$event}`);
    // console.log('click event is called {$event}' +  $event.coords.lat + '-' + $event.coords.lng);
  }
  
  delete($event: any){
    console.log(`delete is called {$event}`);
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

  radiusChanged($event: any) {
    console.log("Changed radius!");
    this.loadAllNurseOnTheMap();
  }

  expandSearchingRadius() {
    if(this.radius<10000)
      this.radius += 5000;
    this.loadAllNurseOnTheMap();
  }

  collapseSearchingRadius() {
    if(this.radius>5000)
      this.radius -= 5000;
    this.loadAllNurseOnTheMap();
  }

  onChangeCareer($event: any) {
    this.loadAllNurseOnTheMap();
  }

  onChangeType($event: any) {
    this.loadAllNurseOnTheMap();
  }

  onChangeHospital($event: any) {
    this.loadAllNurseOnTheMap();
  }

  onChangeMode($event: any) {
    this.loadAllNurseOnTheMap();
  }  

  onChangeHour($event: any, date: string) {
    switch(date) {
      case 'mon': 
        this.date[0] = "Thứ 2 - " +this.mon.value;
        break;
      case 'tue': 
        this.date[1] = "Thứ 3 - " +this.tue.value;
        break;
      case 'wed': 
        this.date[2] = "Thứ 4 - " +this.wed.value;
        break;
      case 'thu': 
        this.date[3] = "Thứ 5 - " +this.thu.value;
        break;
      case 'fri': 
        this.date[4] = "Thứ 6 - " +this.fri.value;
        break;
      case 'sat': 
        this.date[5] = "Thứ 7 - " +this.sat.value;
        break;
      case 'sun': 
        this.date[6] = "Chủ Nhật - " +this.sun.value;
        break;                                          
    }
      console.log(this.date);
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
    console.log("ahuhu" + this.value);
    // this.contractsService.create(contract).subscribe(
    //             data => {
    //                 this.alertService.success('Make a contract successful', true);
    //                 this.ahuhu ="123";
    //                 // this.router.navigate(['/login']);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.ahuhu ="456";
    //                 // this.loading = false;
    //             });
  }

  convertDate(d)
  {
    var parts = d.split('/',3);
    return new Date(parts[2], parts[1]-1, parts[0]);
  }


  makeContract() {
    console.log("Choosing nurse is " + this.nurseProfile.owner.username + ' at index ' + this.markerNo);
    console.log("ahuhu" + this.value.toString());
    let day = this.value.split("-",2);
    console.log("ahhihi" + day[0] + "+" + day[1]);
    let date = new Date(Date.now());
    let startDate = this.convertDate(day[0]);
    let endDate = this.convertDate(day[1]);
    if(startDate <= date) {
      console.log("<=" + startDate + "," + endDate + "," + date);
      this.alertService.success('Start date is before today!', false);
      return;
    }

    else {
      startDate.setDate(startDate.getDate()+1);
      endDate.setDate(endDate.getDate()+1);
      let loc = new Location(this.latitude, this.longitude);
      console.log(">" + startDate + "," + endDate + "," + date + "," + this.nurseProfile.owner._id);
      let contractDetail = new ContractDetailModel(this.patientDescription,this.date);
      let contract = new ContractModel(this.currentUser._id, this.nurseProfile.owner._id, startDate, endDate, this.patientName, this.patientAge, this.address, loc, contractDetail);
      this.contractsService.create(contract).takeWhile(() => this.alive).subscribe(
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

  }

  // private fillboundAllNurseOnTheMap() {

  //   this.mapsAPILoader.load().then(() => {
  //       this.latlngBounds = new window['google'].maps.latlngBounds();
  //       this.markers.forEach(marker => 
  //       this.latlngBounds.extend(new window['google'].maps.LatLng(marker.lat, marker.lng))
  //     );
  //   })
  // }

  private autoComplete() {

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
      });
      this.pathsSelect = this.lockRegionForCurrentUser();
      let nurseLatLng = new google.maps.LatLng(10, 30);
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
          this.pathsSelect = this.lockRegionForCurrentUser();
          this.loadAllNurseOnTheMap();
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

  // var rad = function(x) {
  //   return x * Math.PI / 180;
  // };

  // var getDistance = function(p1, p2) {
  //   var R = 6378137; // Earth’s mean radius in meter
  //   var dLat = rad(p2.lat() - p1.lat());
  //   var dLong = rad(p2.lng() - p1.lng());
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
  //     Math.sin(dLong / 2) * Math.sin(dLong / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   return d; // returns the distance in meter
  // };

  public deg2rad(deg) {
      return deg * (Math.PI/180)
   }

  public getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    // var R = 6371; // Radius of the earth in km
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }



  // private loadAllNurseOnTheMap() {
  //   let dem = 0;
  // //   var bounds = this.myCircle.getBounds().then((m) => {
  // //   console.log('native map',m);
  // // }, err=>{
  // //   console.log('error',err);
  // // })
  //     this.markers.length = 0;
  //     this.nursesService.search(this.searchCriteriaCareer.value, this.searchCriteriaType.value, this.searchCriteriaHospital.value).subscribe(nurses => { 
  //       // this.nurses = nurses;
  //       // this.nurses.forEach(nurse => {
  //       //   console.log("Nurse ", nurse);
  //       //   console.log("location ", this.locations);
  //       //   // let nurseMarker = {
  //       //   //   name: nurse.username,
  //       //   //   lat: +nurse.location.latitude.toString(),
  //       //   //   lng: +nurse.location.longitude.toString(),
  //       //   //   draggable: false
  //       //   // }
  //       //   var locationss = new Location();
  //       //   locationss= Object.assign({}, nurse.location);
  //       //   let nurseMarker = {
  //       //     name: nurse.username,
  //       //     lat: locationss.latitude,
  //       //     lng: locationss.longitude,
  //       //     draggable: false
  //       //   }

  //         this.nurses = nurses;
  //         nurses.forEach(nurse => {
  //         console.log("Nurse ", nurse);
  //         console.log("location ", nurse.location.latitude.toString());
  //         // let nurseLatLng = new google.maps.LatLng(nurse.location.latitude, nurse.location.longitude);
  //         // let distance = google.maps.geometry.spherical.computeDistanceBetween(this.yourLatLng, nurseLatLng);
  //         // google.maps.geometry.poly.containsLocation(nurse.location, this.myCircle);
  //         if (this.getDistanceFromLatLonInKm(this.latitude,this.longitude,nurse.location.latitude,nurse.location.longitude) <= this.radius) {
  //           let nurseMarker = {
  //             no: dem,
  //             name: nurse.username,
  //             lat: nurse.location.latitude,
  //             lng: nurse.location.longitude,
  //             // distance: distance,
  //             draggable: false
  //           }
  //           dem++;
  //           console.log("Nurse Marker ", nurseMarker);
  //           this.markers.push(nurseMarker);
  //         }

  //       });  
  //     });
  // }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  private lockRegionForCurrentUser() {
    var polygonC = new google.maps.Polygon({
        paths: this.pathsCenter,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
    var polygonT = new google.maps.Polygon({
        paths: this.pathsTop,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }); 
    var polygonB = new google.maps.Polygon({
        paths: this.pathsBottom,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }); 
    var polygonL = new google.maps.Polygon({
        paths: this.pathsLeft,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
    var polygonR = new google.maps.Polygon({
        paths: this.pathsRight,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });                            
    let nurseLatLng = new google.maps.LatLng(this.latitude, this.longitude);
    let ft = false;
    ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonC);
    console.log("PolygonC:" + ft);
    if (ft) {
      this.paths = this.pathsCenter;
      return "C";   
    }
      
    ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonT);
    console.log("PolygonT:" + ft);
    if (ft) {
      this.paths = this.pathsTop;
      return "T";   
    }    
    ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonB);
    console.log("PolygonB:" + ft);   
    if (ft) {
      this.paths = this.pathsBottom;
      return "B";   
    } 
    ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonL);
    console.log("PolygonL:" + ft);   
    if (ft) {
      this.paths = this.pathsLeft;
      return "L";   
    }
    ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonR);
    console.log("PolygonR:" + ft);   
    if (ft) {
      this.paths = this.pathsRight;
      return "R";   
    }

    return "X";
  }

  private lockRegionForNurse(s: string, nurse: any) {
    let nurseLatLng = new google.maps.LatLng(nurse.owner.location.latitude, nurse.owner.location.longitude);
    let ft = false;
    switch(s) {
      case 'C':
        var polygonC = new google.maps.Polygon({
            paths: this.pathsCenter,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
          ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonC);
          console.log("PolygonC:" + ft);
          break;            
      case 'T':
        var polygonT = new google.maps.Polygon({
          paths: this.pathsTop,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
          ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonT);
          console.log("PolygonT:" + ft);
          break;    
      case 'B':
        var polygonB = new google.maps.Polygon({
            paths: this.pathsBottom,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          }); 
        ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonB);
        console.log("PolygonB:" + ft);   
        break;

      case 'L':
        var polygonL = new google.maps.Polygon({
            paths: this.pathsLeft,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });      
        ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonL);
        console.log("PolygonL:" + ft);   
        break;
          
      case 'R':
        var polygonR = new google.maps.Polygon({
            paths: this.pathsRight,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
        ft = google.maps.geometry.poly.containsLocation(nurseLatLng, polygonR);
        console.log("PolygonR:" + ft); 
        break;    

      case 'X':
        ft = false;
        console.log("PolygonX:" + ft); 
        break;           
    }
    return ft;
  }

  private loadAllNurseOnTheMap() {
      this.markers.length = 0;
      // this.markers = [];

      this.nursesService.search(this.searchCriteriaCareer.value, this.searchCriteriaType.value, this.searchCriteriaHospital.value)
        .takeWhile(() => this.alive)
        .subscribe(nurses => { 
          // this.nurseProfiles = nurses;
          this.nurseProfiles = [];

          let dem = 0;
          nurses.forEach(nurse => {
          console.log("Nurse ", nurse);
          console.log("location ", nurse.owner.location.latitude.toString());

          switch(this.searchMode.value) {
            case "nearby":
              // for old mode
              if (this.getDistanceFromLatLonInKm(this.latitude,this.longitude,nurse.owner.location.latitude,nurse.owner.location.longitude) <= this.radius) {
                let nurseMarker = {
                  no: dem,
                  name: nurse.owner.profile.name,
                  email: nurse.owner.profile.email,
                  phone: nurse.owner.profile.phone,   
                  sex: nurse.owner.profile.sex,
                  age: nurse.owner.profile.age,
                  address: nurse.owner.profile.address,
                  hospital: nurse.hospital,          
                  lat: nurse.owner.location.latitude,
                  lng: nurse.owner.location.longitude,
                  // distance: distance,
                  draggable: false
                }
                dem++;
                console.log("Nurse Marker ", nurseMarker);
                this.markers.push(nurseMarker);
                this.nurseProfiles.push(nurse);
              };
              break;
            case "sector":            
              // for new mode
              if (this.lockRegionForNurse(this.pathsSelect, nurse)) {
                let nurseMarker = {
                  no: dem,
                  name: nurse.owner.profile.name,
                  email: nurse.owner.profile.email,
                  phone: nurse.owner.profile.phone,   
                  sex: nurse.owner.profile.sex,
                  age: nurse.owner.profile.age,
                  address: nurse.owner.profile.address,
                  hospital: nurse.hospital,          
                  lat: nurse.owner.location.latitude,
                  lng: nurse.owner.location.longitude,
                  // distance: distance,
                  draggable: false
                }
                dem++;
                console.log("Nurse Marker ", nurseMarker);
                this.markers.push(nurseMarker);
                this.nurseProfiles.push(nurse);
              };
              break;
          }
        });  
        dem = 0;
      });
  }


  
  ngOnDestroy() {
    this.alive = false;
  }
  
}


  interface marker {
    no: number;
    name?: string;
    email?: string;
    phone?: number;   
    sex?: string;
    age?: string;
    address?: string;
    hospital?: string;
    lat: number;
    lng: number;
    label?: string;
    // distance?: number;
    draggable: boolean;
    animation?: any;
}