import { TestBed } from '@angular/core/testing';

import { ZanuttaService } from './zanutta.service';

describe('ZanuttaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZanuttaService = TestBed.get(ZanuttaService);
    expect(service).toBeTruthy();
  });
});
