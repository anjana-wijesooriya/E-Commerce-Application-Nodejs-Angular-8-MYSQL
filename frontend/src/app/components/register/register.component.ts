import { Component, OnInit } from '@angular/core';
import { ShippingService } from 'src/app/services/Shipping/shipping.service';
import { ShippingRegion } from 'src/app/models/shipping-region';
import { Customer } from 'src/app/models/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regions: ShippingRegion[];
  customer: Customer = new Customer();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private shippingService: ShippingService,
              private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.GetShippingRegions();
    this.customer.RegionId = 1;
    this.registerForm = this.formBuilder.group({
        FirstName: ['', Validators.required],
        AddressOne: ['', Validators.required],
        AddressTwo: ['', null],
        Town: ['', Validators.required],
        Country: ['', Validators.required],
        RegionId: ['', null],
        ZipCode: ['', null],
        Mobile: ['', Validators.required],
        CreditCard: ['', null],
        LastName: ['', Validators.required],
        Email: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  GetShippingRegions(){
    this.shippingService.getShippingRegions()
        .subscribe(a => {
          this.regions = a as ShippingRegion[];
        });
  }

  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.customer = this.registerForm.value;
        this.customerService.AddNewCustomer(this.customer)
            .subscribe(a => {
              console.log(a);
              if(a){
                this.router.navigate(['/login']);
              }
            })
    console.log(this.registerForm.value);
  }

}
