import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCertificadoCursoAprobadosComponent } from './reporte-certificado-curso-aprobados.component';

describe('ReporteCertificadoCursoAprobadosComponent', () => {
  let component: ReporteCertificadoCursoAprobadosComponent;
  let fixture: ComponentFixture<ReporteCertificadoCursoAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCertificadoCursoAprobadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCertificadoCursoAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
