import { TestBed, inject } from '@angular/core/testing';

import { DateformatService } from './dateformat.service';

describe('DateformatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateformatService]
    });
  });

  it('should be created', inject([DateformatService], (service: DateformatService) => {
    expect(service).toBeTruthy();
  }));
});
