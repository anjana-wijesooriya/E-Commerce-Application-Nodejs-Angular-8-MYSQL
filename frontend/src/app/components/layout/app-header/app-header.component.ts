import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/Shared/data.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
   itemCount: number = 0;
  message: string;
  user: Customer;
  isLogged: boolean = false;
  constructor(private dataService: DataService,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.count.subscribe(count => this.itemCount = count);
    if(localStorage.getItem('user') == 'undefined'){
      this.user = null;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.isLogged = this.user != null;
  }

  onLogout(){
    this.customerService.Logout().subscribe(a => {
      localStorage.removeItem('user');
      this.user = (localStorage.getItem('user') == 'undefined') ? null : JSON.parse(localStorage.getItem('user'));
      this.isLogged = this.user != null;
      window.location.reload();
    });
  }

}
