import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarCursoComponent } from './aceptar-curso.component';

describe('AceptarCursoComponent', () => {
  let component: AceptarCursoComponent;
  let fixture: ComponentFixture<AceptarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptarCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
