import { TestBed } from '@angular/core/testing';

import { RzpayService } from './rzpay.service';

describe('RzpayService', () => {
  let service: RzpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RzpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
