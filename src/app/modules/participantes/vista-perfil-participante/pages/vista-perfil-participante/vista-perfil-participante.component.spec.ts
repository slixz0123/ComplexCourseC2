import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPerfilParticipanteComponent } from './vista-perfil-participante.component';

describe('VistaPerfilParticipanteComponent', () => {
  let component: VistaPerfilParticipanteComponent;
  let fixture: ComponentFixture<VistaPerfilParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPerfilParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPerfilParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
