import { TestBed } from '@angular/core/testing';

import { ItemCardServiceService } from './item-card-service.service';

describe('ItemCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCardServiceService = TestBed.get(ItemCardServiceService);
    expect(service).toBeTruthy();
  });
});
