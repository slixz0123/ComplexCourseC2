import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadCursoComponent } from './modalidad-curso.component';

describe('ModalidadCursoComponent', () => {
  let component: ModalidadCursoComponent;
  let fixture: ComponentFixture<ModalidadCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalidadCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalidadCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
