import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaInscripcionComponent } from './ficha-inscripcion.component';

describe('FichaInscripcionComponent', () => {
  let component: FichaInscripcionComponent;
  let fixture: ComponentFixture<FichaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
