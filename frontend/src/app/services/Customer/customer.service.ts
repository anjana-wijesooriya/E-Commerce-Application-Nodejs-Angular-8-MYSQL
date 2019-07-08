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

}
