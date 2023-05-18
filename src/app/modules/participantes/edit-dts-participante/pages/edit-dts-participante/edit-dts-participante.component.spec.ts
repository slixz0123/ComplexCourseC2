import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDtsParticipanteComponent } from './edit-dts-participante.component';

describe('EditDtsParticipanteComponent', () => {
  let component: EditDtsParticipanteComponent;
  let fixture: ComponentFixture<EditDtsParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDtsParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDtsParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
