import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPerfilDocenteComponent } from './vista-perfil-docente.component';

describe('VistaPerfilDocenteComponent', () => {
  let component: VistaPerfilDocenteComponent;
  let fixture: ComponentFixture<VistaPerfilDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPerfilDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPerfilDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
