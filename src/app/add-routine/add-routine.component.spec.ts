import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineAddComponent } from './add-routine.component';

describe('RoutineAddComponent', () => {
  let component: RoutineAddComponent;
  let fixture: ComponentFixture<RoutineAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineAddComponent]
    });
    fixture = TestBed.createComponent(RoutineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
