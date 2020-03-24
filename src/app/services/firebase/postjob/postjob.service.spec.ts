import { TestBed, inject } from '@angular/core/testing';

import { PostjobService } from './postjob.service';

describe('PostjobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostjobService]
    });
  });

  it('should be created', inject([PostjobService], (service: PostjobService) => {
    expect(service).toBeTruthy();
  }));
});
