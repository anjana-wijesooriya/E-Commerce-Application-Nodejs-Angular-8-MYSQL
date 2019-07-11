import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  checkoutProducts: CartProduct[];
  totalPrice: number = 0;
  date: number;
  tax = 6.4;
  remark: string = '';
  constructor() {
    const products = JSON.parse(localStorage.getItem('Cart'));
    this.checkoutProducts = products;
    products.forEach((product) => {
			this.totalPrice += product.Price;
		});
  }

  ngOnInit() {
  }

}
