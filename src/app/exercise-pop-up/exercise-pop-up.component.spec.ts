import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePopUpComponent } from './exercise-pop-up.component';

describe('ExercisePopUpComponent', () => {
  let component: ExercisePopUpComponent;
  let fixture: ComponentFixture<ExercisePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisePopUpComponent]
    });
    fixture = TestBed.createComponent(ExercisePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
