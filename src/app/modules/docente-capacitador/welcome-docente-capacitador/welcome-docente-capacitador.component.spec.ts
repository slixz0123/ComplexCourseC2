import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDocenteCapacitadorComponent } from './welcome-docente-capacitador.component';

describe('WelcomeDocenteCapacitadorComponent', () => {
  let component: WelcomeDocenteCapacitadorComponent;
  let fixture: ComponentFixture<WelcomeDocenteCapacitadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeDocenteCapacitadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeDocenteCapacitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
