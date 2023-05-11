import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosCursoComponent } from './horarios-curso.component';

describe('HorariosCursoComponent', () => {
  let component: HorariosCursoComponent;
  let fixture: ComponentFixture<HorariosCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorariosCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
