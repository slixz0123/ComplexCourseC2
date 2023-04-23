import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsistenciaComponent } from './register-asistencia.component';

describe('RegisterAsistenciaComponent', () => {
  let component: RegisterAsistenciaComponent;
  let fixture: ComponentFixture<RegisterAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
