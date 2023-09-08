import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineFinalComponent } from './add-routine-final.component';

describe('AddRoutineFinalComponent', () => {
  let component: AddRoutineFinalComponent;
  let fixture: ComponentFixture<AddRoutineFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoutineFinalComponent]
    });
    fixture = TestBed.createComponent(AddRoutineFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
