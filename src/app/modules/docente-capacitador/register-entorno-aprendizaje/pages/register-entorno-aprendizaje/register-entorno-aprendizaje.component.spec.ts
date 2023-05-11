import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntornoAprendizajeComponent } from './register-entorno-aprendizaje.component';

describe('RegisterEntornoAprendizajeComponent', () => {
  let component: RegisterEntornoAprendizajeComponent;
  let fixture: ComponentFixture<RegisterEntornoAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEntornoAprendizajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEntornoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
