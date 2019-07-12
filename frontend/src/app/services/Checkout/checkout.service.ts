import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from 'src/app/models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  CreatePaypalTransacton(orderDetail: OrderDetail){
    return this.http.post<any>(`${this.url}order/submitOrder`, orderDetail);
  }

}
