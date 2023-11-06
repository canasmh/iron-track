import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTimerComponent } from './workout-timer.component';

describe('WorkoutTimerComponent', () => {
  let component: WorkoutTimerComponent;
  let fixture: ComponentFixture<WorkoutTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutTimerComponent]
    });
    fixture = TestBed.createComponent(WorkoutTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
