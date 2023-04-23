import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaParticipantesComponent } from './bienvenida-participantes.component';

describe('BienvenidaParticipantesComponent', () => {
  let component: BienvenidaParticipantesComponent;
  let fixture: ComponentFixture<BienvenidaParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaParticipantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
