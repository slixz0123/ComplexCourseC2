import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgramCapComponent } from './register-program-cap.component';

describe('RegisterProgramCapComponent', () => {
  let component: RegisterProgramCapComponent;
  let fixture: ComponentFixture<RegisterProgramCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProgramCapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProgramCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
