import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdminsComponent } from './register-admins.component';

describe('RegisterAdminsComponent', () => {
  let component: RegisterAdminsComponent;
  let fixture: ComponentFixture<RegisterAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
