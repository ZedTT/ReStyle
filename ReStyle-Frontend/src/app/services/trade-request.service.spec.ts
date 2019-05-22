import { TestBed } from '@angular/core/testing';

import { TradeRequestService } from './trade-request.service';

describe('TradeRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradeRequestService = TestBed.get(TradeRequestService);
    expect(service).toBeTruthy();
  });
});
