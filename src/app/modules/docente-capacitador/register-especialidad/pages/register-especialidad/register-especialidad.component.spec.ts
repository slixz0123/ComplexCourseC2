import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEspecialidadComponent } from './register-especialidad.component';

describe('RegisterEspecialidadComponent', () => {
  let component: RegisterEspecialidadComponent;
  let fixture: ComponentFixture<RegisterEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
