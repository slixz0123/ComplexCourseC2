import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCursosCapcacitacionComponent } from './reporte-cursos-capcacitacion.component';

describe('ReporteCursosCapcacitacionComponent', () => {
  let component: ReporteCursosCapcacitacionComponent;
  let fixture: ComponentFixture<ReporteCursosCapcacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCursosCapcacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCursosCapcacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
