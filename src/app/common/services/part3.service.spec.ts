import { TestBed } from '@angular/core/testing';

import { Part3Service } from './part3.service';

describe('Part3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Part3Service = TestBed.get(Part3Service);
    expect(service).toBeTruthy();
  });
});
