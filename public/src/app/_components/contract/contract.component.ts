import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  contracts: any;
  currentUser: User;
  private statusSelect: any;
  private statusOption: any;

  constructor(
    private contractsService: ContractsService
  ) { 
    this.statusOption = [
      {
        id: 1,
        label: "-Chọn trạng thái-",
        value: ""
      }, {
        id: 2,
        label: "Toàn bộ",
        value: "all"
      }, {
        id: 3,
        label: "Đang chờ kiểm tra",
        value: "check"
      }, {
        id: 4,
        label: "Đã xác nhận",
        value: "approve"
      }, {
        id: 5,
        label: "Đã hủy bỏ",
        value: "reject"
      }
    ];
    this.statusSelect = this.statusOption[0];    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getContractList();
  }

  onChangeStatus($event: any) {
    this.getContractList();
  }

  getContractList() {
    this.contractsService.getAll(this.statusSelect.value, this.currentUser.role, this.currentUser._id).subscribe(contracts => {
      this.contracts = contracts;
      contracts.forEach(contract => {
        console.log("Contract ", contract);
      });
    });
  }

  approve(id: any) {
    let req = {
      id: id
    };
    console.log(id);
    this.contractsService.approve(req).subscribe(result => {
        console.log(result);
    }, err => {
      console.log(err);
    });
  }

  declide(id: any) {
    let req = {
      id: id
    };
    console.log(id);
    this.contractsService.reject(req).subscribe(result => {
        console.log(result);
    }, err => {
      console.log(err);
    });
  }  

}
