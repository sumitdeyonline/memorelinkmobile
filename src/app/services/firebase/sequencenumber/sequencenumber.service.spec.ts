import { TestBed } from '@angular/core/testing';

import { SequencenumberService } from './sequencenumber.service';

describe('SequencenumberService', () => {
  let service: SequencenumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequencenumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
