import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCertificadoCursoAprobadosComponent } from './pages/reporte-certificado-curso-aprobados/reporte-certificado-curso-aprobados.component';

const routes: Routes = [
  {
    path:'',
    component: ReporteCertificadoCursoAprobadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteCertificadoCursoAprobadosRoutingModule { }
