import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteCertificadoCursoAprobadosRoutingModule } from './reporte-certificado-curso-aprobados-routing.module';
import { ReporteCertificadoCursoAprobadosComponent } from './pages/reporte-certificado-curso-aprobados/reporte-certificado-curso-aprobados.component';


@NgModule({
  declarations: [
    ReporteCertificadoCursoAprobadosComponent
  ],
  imports: [
    CommonModule,
    ReporteCertificadoCursoAprobadosRoutingModule
  ],
  exports:[
    ReporteCertificadoCursoAprobadosComponent
  ]
})
export class ReporteCertificadoCursoAprobadosModule { }
