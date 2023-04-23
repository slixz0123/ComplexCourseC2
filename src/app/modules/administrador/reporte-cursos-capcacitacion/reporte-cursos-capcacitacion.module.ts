import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteCursosCapcacitacionRoutingModule } from './reporte-cursos-capcacitacion-routing.module';
import { ReporteCursosCapcacitacionComponent } from './pages/reporte-cursos-capcacitacion/reporte-cursos-capcacitacion.component';


@NgModule({
  declarations: [
    ReporteCursosCapcacitacionComponent
  ],
  imports: [
    CommonModule,
    ReporteCursosCapcacitacionRoutingModule
  ],
  exports:[
    ReporteCursosCapcacitacionComponent
  ]
})
export class ReporteCursosCapcacitacionModule { }
