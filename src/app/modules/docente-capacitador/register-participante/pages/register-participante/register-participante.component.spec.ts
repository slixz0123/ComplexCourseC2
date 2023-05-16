import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParticipanteComponent } from './register-participante.component';

describe('RegisterParticipanteComponent', () => {
  let component: RegisterParticipanteComponent;
  let fixture: ComponentFixture<RegisterParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
