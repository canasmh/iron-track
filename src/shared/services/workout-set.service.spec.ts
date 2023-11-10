import { TestBed } from '@angular/core/testing';

import { WorkoutSetService } from './workout-set.service';

describe('WorkoutSetService', () => {
  let service: WorkoutSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
