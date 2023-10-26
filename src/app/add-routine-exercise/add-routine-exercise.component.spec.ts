import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineExerciseComponent } from './add-routine-exercise.component';

describe('AddRoutineExerciseComponent', () => {
  let component: AddRoutineExerciseComponent;
  let fixture: ComponentFixture<AddRoutineExerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoutineExerciseComponent]
    });
    fixture = TestBed.createComponent(AddRoutineExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
