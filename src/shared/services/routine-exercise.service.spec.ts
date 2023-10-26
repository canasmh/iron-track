import { TestBed } from '@angular/core/testing';

import { RoutineExerciseService } from './routine-exercise.service';

describe('RoutineExerciseService', () => {
  let service: RoutineExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
