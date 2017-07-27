import { Component, OnInit } from '@angular/core';
import { NursesService } from '../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  nurses: any;

  constructor(
    private nursesService: NursesService
  ) { }

  ngOnInit() {
    this.getNurseList();
  }

  getNurseList() {
    this.nursesService.getAll().subscribe(nurses => {
      this.nurses = nurses;
      nurses.forEach(nurse => {
        console.log("Nurse ", nurse);
      });
    });
  }

  deactive(id: any) {
    let req = {
      id: id
    };
    console.log(id);
    this.nursesService.delete(req).subscribe(result => {
        console.log(result);
    }, err => {
      console.log(err);
    });
  }

}
