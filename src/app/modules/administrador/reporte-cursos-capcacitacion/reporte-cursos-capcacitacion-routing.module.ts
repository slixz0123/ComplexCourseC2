import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCursosCapcacitacionComponent } from './pages/reporte-cursos-capcacitacion/reporte-cursos-capcacitacion.component';

const routes: Routes = [
  {
    path:'',
    component: ReporteCursosCapcacitacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteCursosCapcacitacionRoutingModule { }
