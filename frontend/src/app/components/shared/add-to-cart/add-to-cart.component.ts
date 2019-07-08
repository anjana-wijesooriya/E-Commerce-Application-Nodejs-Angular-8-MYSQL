import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/Product/product.service';
import { CartProduct } from 'src/app/models/cart-product';
import { ToastrService } from 'ngx-toastr';
import { AppHeaderComponent } from '../../layout/app-header/app-header.component';
import { DataService } from 'src/app/services/Shared/data.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  quantity: number;
  @Input() sizeId: number;
  @Input() colorId: number;
  @Input() productId: number;
  @Input() isHomePage: boolean;
  messge: string;
  constructor(private productService:ProductService,
              private toastr: ToastrService,
              private dataService: DataService) { }

  ngOnInit() {
    this.quantity = 1;
    this.dataService.currentMessage.subscribe(msg => this.messge = msg);
  }

  onAddProductToCart(){
    let product: CartProduct;
    this.productService.getProductDetailsById(this.productId)
    .subscribe(p => {
      product = p as CartProduct;
      product.Quantity = this.quantity;
      product.SizeId = this.sizeId;
      product.ColorId = this.colorId;
      let cart: CartProduct[] = JSON.parse(localStorage.getItem('Cart'));
      if(cart == null){
        cart = [];
        cart.push(product);
      } else{
        let currentProduct = cart.filter(a => a.ProductId == product.ProductId);
        if(currentProduct.length > 0){
          cart.filter(a => {
            a.Quantity = a.Quantity + this.quantity;
          });
        } else{
          cart.push(product);
        }
      }
      this.dataService.updateCartItemCount(cart.length);
      this.dataService.updateShoppingCart(cart);
      localStorage.setItem('Cart', JSON.stringify(cart));
      this.toastr.success('<i class="fas fa-check ml-1 pr-2"></i><strong>Product Added to the Cart</strong>', null, {
        timeOut: 3000,
        toastClass: 'toast-header',
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        enableHtml: true
      });
    });
    
  }

  // showToast() {
  //   // this.toastrService.show(
  //   //   'This is super toast message',
  //   //   `This is toast number:`);
  // }

}
