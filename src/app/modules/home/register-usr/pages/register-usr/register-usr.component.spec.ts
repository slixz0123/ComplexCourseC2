import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUsrComponent } from './register-usr.component';

describe('RegisterUsrComponent', () => {
  let component: RegisterUsrComponent;
  let fixture: ComponentFixture<RegisterUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
