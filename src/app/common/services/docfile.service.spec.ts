import { TestBed } from '@angular/core/testing';

import { DocfileService } from './docfile.service';

describe('DocfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocfileService = TestBed.get(DocfileService);
    expect(service).toBeTruthy();
  });
});
