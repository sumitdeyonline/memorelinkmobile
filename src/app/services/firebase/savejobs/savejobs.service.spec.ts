import { TestBed } from '@angular/core/testing';

import { SavejobsService } from './savejobs.service';

describe('SavejobsService', () => {
  let service: SavejobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavejobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
