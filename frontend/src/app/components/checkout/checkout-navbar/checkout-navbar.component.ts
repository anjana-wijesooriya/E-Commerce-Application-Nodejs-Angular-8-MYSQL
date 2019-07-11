import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-navbar',
  templateUrl: './checkout-navbar.component.html',
  styleUrls: ['./checkout-navbar.component.scss']
})
export class CheckoutNavbarComponent implements OnInit {

  title: string = '';
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.title =   this.activatedRoute.snapshot.url[0].path;
  }

}
