import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { NurseProfile } from '../_models/index';
import { Nurse } from '../_interfaces/index';

@Injectable()
export class NursesService {

  constructor(private http: Http) { }

    getAll() {
        return this.http.get('/nurses').map((response: Response) => response.json() as NurseProfile[]);
    }

    search() {
        // return this.http.get('/activenurses').map((response: Response) => response.json() as NurseProfile[]);
        return this.http.get('/activenurses').map((response: Response) => response.json() as Nurse[]);
    }
 
    // getById(_id: string) {
    //     return this.http.get('/users/' + _id).map((response: Response) => response.json());
    // }
 
    // create(user: User) {
    //     return this.http.post('/users', user);
    // }
 
    // update(user: User) {
    //     return this.http.put('/users/' + user._id, user);
    // }
 
    // delete(_id: string) {
    //     return this.http.delete('/users/' + _id);
    // }

}


// export interface Nurse {
//     _id: string;
//     username: string;
//     nurseProfile: NurseProfil;
//     profile: Profil;
//     location: Loc;
//     // certification: string;
//     // rate: number;
//     // retribution: number;
// }

// export interface Loc {
//     latitude: number;
//     longitude: number;
// }

// export interface NurseProfil {
//     career: string;
//     working_place: string;
//     address: string;
//     age: number;
//     sex: string;
// }

// export interface Profil {

//     email: string;
//     phone: number;
// }