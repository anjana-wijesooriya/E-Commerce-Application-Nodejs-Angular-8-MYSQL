import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/Shared/data.service';
import { CartProduct } from 'src/app/models/cart-product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart: CartProduct[] = [];
  total: number = 0;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.cart.subscribe(a => this.cart = a);
    this.getTotal();
  }

  getCartProductItems(){
    this.cart = JSON.parse(localStorage.getItem('Cart'));
  }

  onRemoveProductsFromCart(productId: number){
    this.cart = this.cart.filter(a => a.ProductId != productId);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.dataService.updateCartItemCount(this.cart.length);
    this.dataService.updateShoppingCart(this.cart);
    this.getTotal();
  }

  onUpdateQuantity(type, productId){
    if(type == 1){
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId){
          this.cart[index].Quantity = element.Quantity + 1;
        }
      });
    } else {
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId){
          this.cart[index].Quantity = element.Quantity - 1;
        }
      });
    }
    this.getTotal();
  }

  getTotal(){
    this.total = 0;
    this.cart.forEach((element) => {
      this.total = this.total + (element.Price*element.Quantity);
    })
  }

}
