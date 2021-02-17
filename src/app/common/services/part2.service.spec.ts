import { TestBed } from '@angular/core/testing';

import { Part2Service } from './part2.service';

describe('Part2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Part2Service = TestBed.get(Part2Service);
    expect(service).toBeTruthy();
  });
});
