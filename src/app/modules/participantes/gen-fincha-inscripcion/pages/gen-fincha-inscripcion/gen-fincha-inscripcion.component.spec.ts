import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenFinchaInscripcionComponent } from './gen-fincha-inscripcion.component';

describe('GenFinchaInscripcionComponent', () => {
  let component: GenFinchaInscripcionComponent;
  let fixture: ComponentFixture<GenFinchaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenFinchaInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenFinchaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
