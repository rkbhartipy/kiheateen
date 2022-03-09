import { TestBed } from '@angular/core/testing';

import { LocalDataStoreService } from './local-data-store.service';

describe('LocalDataStoreService', () => {
  let service: LocalDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
