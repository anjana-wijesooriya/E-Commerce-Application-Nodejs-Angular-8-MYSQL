import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  AddNewCustomer(customer: Customer): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}customer/addNewCustomer`, customer);
  }

  Login(username: string, password: string): Observable<Customer>{
    return this.http.post<Customer>(`${this.url}customer/authenticateLogin`, {Username: username, Password: password});
  }

  Logout(){
    let result = this.http.get(`${this.url}customer/logout`);
    return result;
  }

}
