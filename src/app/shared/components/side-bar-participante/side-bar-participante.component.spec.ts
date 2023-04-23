import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarParticipanteComponent } from './side-bar-participante.component';

describe('SideBarParticipanteComponent', () => {
  let component: SideBarParticipanteComponent;
  let fixture: ComponentFixture<SideBarParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
