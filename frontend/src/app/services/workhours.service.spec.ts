import { TestBed } from '@angular/core/testing';

import { WorkhoursService } from './workhours.service';

describe('WorkhoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkhoursService = TestBed.get(WorkhoursService);
    expect(service).toBeTruthy();
  });
});
