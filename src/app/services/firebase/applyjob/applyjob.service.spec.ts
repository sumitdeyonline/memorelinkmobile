import { TestBed } from '@angular/core/testing';

import { ApplyjobService } from './applyjob.service';

describe('ApplyjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyjobService = TestBed.get(ApplyjobService);
    expect(service).toBeTruthy();
  });
});
