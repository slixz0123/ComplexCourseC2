import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListAdminsComponent } from './edit-list-admins.component';

describe('EditListAdminsComponent', () => {
  let component: EditListAdminsComponent;
  let fixture: ComponentFixture<EditListAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
