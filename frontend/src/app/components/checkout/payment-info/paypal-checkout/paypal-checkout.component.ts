import { Component, OnInit, Input } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/cart-product';
import { CheckoutService } from 'src/app/services/Checkout/checkout.service';
import { OrderDetail } from 'src/app/models/order-detail';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss']
})
export class PaypalCheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  showCancel: boolean = false;
  showError: boolean = false;
  @Input() totalAmount: number = 0;
  @Input() comments: string;
  currency: string = 'USD';
  cart: CartProduct[] = [];
  productList: any[] = [];
  user: Customer;
  constructor(private router: Router,
    private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('Cart'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.cart.forEach(element => {
      this.productList.push({
        name: element.Name,
        quantity: element.Quantity,
        category: `${element.DepartmentName} - ${element.CategoryName}`,
        unit_amount: {
          currency_code: `${this.currency}`,
          value: `${element.Price}`,
        },
      });
    });
    this.initConfig();
  }

  private initConfig(): void {
    const self = this;
    let orderData: OrderDetail = {
      Cart: this.cart,
      User: this.user,
      Remarks: this.comments,
      TotalAmount: 0
    }
    self.payPalConfig = {
      currency: `${self.currency}`,
      clientId: 'Ab3l0gB8QNw6-EyPVS4VOVCAVEUqPdH4nu_80JvhTfQDes13ZaCs0l7tvXXgLOFWzt6mzLNELA2ywvXH',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: `${self.currency}`,
            value: `${self.totalAmount}`,
            breakdown: {
              item_total: {
                currency_code: `${self.currency}`,
                value: `${self.totalAmount}`
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: `${self.currency}`,
              value: `${self.totalAmount}`,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'checkout',
        layout: 'vertical',
        shape: 'rect',
        color: 'blue',
        size: 'large'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        self.checkoutService.CreatePaypalTransacton(orderData)
          .subscribe(data => {
            localStorage.removeItem('Cart');
            self.router.navigate(['/order/order-confirmation']);
          });

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', orderData, actions);
        orderData.Remarks = self.comments;
        orderData.TotalAmount = self.totalAmount;
        self.checkoutService.CreatePaypalTransacton(orderData)
          .subscribe(data => {
            // localStorage.removeItem('Cart');
            // self.router.navigate(['/order/order-confirmation']);
            console.log(data)
          });
        this.resetStatus();
      },
    };
  }
  resetStatus() {
    console.log("Method not implemented.");
  }


}
