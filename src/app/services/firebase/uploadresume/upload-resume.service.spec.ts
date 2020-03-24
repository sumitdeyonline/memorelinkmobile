import { TestBed } from '@angular/core/testing';

import { UploadResumeService } from './upload-resume.service';

describe('UploadResumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadResumeService = TestBed.get(UploadResumeService);
    expect(service).toBeTruthy();
  });
});
