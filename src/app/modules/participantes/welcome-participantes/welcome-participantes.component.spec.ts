import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeParticipantesComponent } from './welcome-participantes.component';

describe('WelcomeParticipantesComponent', () => {
  let component: WelcomeParticipantesComponent;
  let fixture: ComponentFixture<WelcomeParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeParticipantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
