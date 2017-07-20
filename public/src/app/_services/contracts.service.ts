import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Contract } from '../_interfaces/index';

@Injectable()
export class ContractsService {

  constructor(private http: Http) { }

    // getAll() {
    //     return this.http.get('/nurses').map((response: Response) => response.json() as NurseProfile[]);
    // }

    // search() {
    //     // return this.http.get('/activenurses').map((response: Response) => response.json() as NurseProfile[]);
    //     return this.http.get('/activenurses').map((response: Response) => response.json() as Nurse[]);
    // }
 
    // getById(_id: string) {
    //     return this.http.get('/users/' + _id).map((response: Response) => response.json());
    // }
 
    create(contract: any) {

        return this.http.post('/contracts', contract);
    }
 
    // update(user: User) {
    //     return this.http.put('/users/' + user._id, user);
    // }
 
    // delete(_id: string) {
    //     return this.http.delete('/users/' + _id);
    // }

}