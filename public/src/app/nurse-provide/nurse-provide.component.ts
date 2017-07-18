import { Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { NurseProfile, Location } from '../_models/index';
import { NursesService, MarkersService } from '../_services/index';
import {} from '@types/googlemaps';

@Component({
  moduleId: module.id,  
  // selector: 'app-nurse-provide',
  templateUrl: './nurse-provide.component.html',
  styleUrls: ['./nurse-provide.component.css'],
  providers: [MarkersService]
})
export class NurseProvideComponent implements OnInit {

  nurses: NurseProfile[] = [];
  public locations: Location;

  //Start Position
  public latitude: number;
  public longitude: number;

  //Search form
  public searchControl: FormControl;

  //Zoom level
  public zoom: number;
  public icon : string;

  //values
  markerName: string;
  markerLat: number;
  markerLng: number;
  markerDraggable: boolean;

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
    private nursesService: NursesService,
    private markerService: MarkersService
  ) { }

  ngOnInit() {

    //set google maps defaults
    this.zoom = 12;
    this.latitude = 10.847171;
    this.longitude = 106.786956;
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    this.loadAllNurseOnTheMap();

    //load Places Autocomplete
    this.autoComplete();

  }

  clickedMarker(marker: marker, index: number) {
    console.log("Clicked marker " + marker.name + ' at index ' + index + ' with lat ' + marker.lat + ' lng ' + marker.lng);
    this.markerName = marker.name;
    this.markerLat= marker.lat;
    this.markerLng = marker.lng;
    this.markerDraggable = marker.draggable;
  }

  mapClicked($event: any) {
    console.log("Clicked map");
    let newMarker = {
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
        this.nursesService.getAll().subscribe(nurses => { 
          this.nurses = nurses;
          this.nurses.forEach(nurse => {
            console.log("Nurse ", nurse);
            console.log("location ", this.locations);
            let nurseMarker = {
              name: nurse.username,
              lat: +nurse.location.latitude.toString(),
              lng: +nurse.location.longitude.toString(),
              draggable: false
            }
            console.log("Nurse Marker ", nurseMarker);
            this.markers.push(nurseMarker);
          });  
        });
    }


  
}


  interface marker {
    name?: string;
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    animation?: any;
}