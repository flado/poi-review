import { TestBed, inject } from '@angular/core/testing';

import { MarkerDataServiceService } from './marker-data-service.service';

describe('MarkerDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerDataServiceService]
    });
  });

  it('should be created', inject([MarkerDataServiceService], (service: MarkerDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
