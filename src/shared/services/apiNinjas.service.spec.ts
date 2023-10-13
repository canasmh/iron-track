import { TestBed } from '@angular/core/testing';

import { ExercisesApiService } from './apiNinjas.service';

describe('ExercisesApiService', () => {
  let service: ExercisesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
