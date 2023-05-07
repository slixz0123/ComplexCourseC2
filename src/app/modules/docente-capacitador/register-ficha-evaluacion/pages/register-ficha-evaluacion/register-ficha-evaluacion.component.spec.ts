import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFichaEvaluacionComponent } from './register-ficha-evaluacion.component';

describe('RegisterFichaEvaluacionComponent', () => {
  let component: RegisterFichaEvaluacionComponent;
  let fixture: ComponentFixture<RegisterFichaEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFichaEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFichaEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
