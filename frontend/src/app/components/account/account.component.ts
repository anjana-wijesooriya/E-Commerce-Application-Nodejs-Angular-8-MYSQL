import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  loggedUser: Customer;
  constructor() { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

}
