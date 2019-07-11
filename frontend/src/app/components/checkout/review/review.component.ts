import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  checkoutProducts: CartProduct[];
  totalPrice: number = 0;
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
