import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizarProgramasCapacitacionRoutingModule } from './visualizar-programas--capacitacion-routing.module';
import { VisualizarProgramasCapacitacionComponent } from './pages/visualizar-programas-capacitacion/visualizar-programas-capacitacion.component';


@NgModule({
  declarations: [
    VisualizarProgramasCapacitacionComponent
  ],
  imports: [
    CommonModule,
    VisualizarProgramasCapacitacionRoutingModule
  ],
  exports:[
    VisualizarProgramasCapacitacionComponent
  ]
})
export class VisualizarProgramasCapacitacionModule { }
