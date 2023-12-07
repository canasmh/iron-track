import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserNameComponent } from './edit-user-name.component';

describe('EditUserNameComponent', () => {
  let component: EditUserNameComponent;
  let fixture: ComponentFixture<EditUserNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserNameComponent]
    });
    fixture = TestBed.createComponent(EditUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
