import { TestBed } from '@angular/core/testing';

import { MostRateService } from './most-rate.service';

describe('MostRateService', () => {
  let service: MostRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
