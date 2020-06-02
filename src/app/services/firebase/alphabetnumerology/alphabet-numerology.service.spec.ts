import { TestBed } from '@angular/core/testing';

import { AlphabetNumerologyService } from './alphabet-numerology.service';

describe('AlphabetNumerologyService', () => {
  let service: AlphabetNumerologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphabetNumerologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
