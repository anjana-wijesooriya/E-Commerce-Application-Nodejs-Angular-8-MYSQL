import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private message = new BehaviorSubject('default');
  currentMessage = this.message.asObservable();
  private ItemCount = new BehaviorSubject(0);
  count: Observable<number> = this.ItemCount.asObservable();
  private shoppingCart = new BehaviorSubject([]);
  cart = this.shoppingCart.asObservable();
  constructor() { 
    let isEmptyCart: boolean = localStorage.getItem('Cart') == null;
    this.updateCartItemCount(isEmptyCart ? 0 : JSON.parse(localStorage.getItem('Cart')).length);
    this.updateShoppingCart(isEmptyCart ? [] :JSON.parse(localStorage.getItem('Cart')));
  }

  changeMessage(message: string) {
    this.message.next(message);
  }

  updateCartItemCount(count: number){
    this.ItemCount.next(count);
  }

  updateShoppingCart(cartItems: CartProduct[]){
    this.shoppingCart.next(cartItems);
  }

}
