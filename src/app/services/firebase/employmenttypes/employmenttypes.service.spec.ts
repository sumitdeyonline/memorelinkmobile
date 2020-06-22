import { TestBed } from '@angular/core/testing';

import { EmploymenttypesService } from './employmenttypes.service';

describe('EmploymenttypesService', () => {
  let service: EmploymenttypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymenttypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
