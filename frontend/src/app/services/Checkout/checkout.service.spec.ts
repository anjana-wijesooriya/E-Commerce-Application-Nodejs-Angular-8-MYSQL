/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';

describe('Service: Checkout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutService]
    });
  });

  it('should ...', inject([CheckoutService], (service: CheckoutService) => {
    expect(service).toBeTruthy();
  }));
});
