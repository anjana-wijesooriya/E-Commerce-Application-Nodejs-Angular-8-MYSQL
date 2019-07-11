import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  customerInfor: Customer = new Customer();
  constructor() { }

  ngOnInit() {
    this.customerInfor = JSON.parse(localStorage.getItem('user'));
  }

}
