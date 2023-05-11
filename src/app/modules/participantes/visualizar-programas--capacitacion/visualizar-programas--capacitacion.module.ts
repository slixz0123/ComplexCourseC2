import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VisualizarProgramasCapacitacionRoutingModule } from './visualizar-programas--capacitacion-routing.module';
import { VisualizarProgramasCapacitacionComponent } from './pages/visualizar-programas-capacitacion/visualizar-programas-capacitacion.component';


@NgModule({
  declarations: [
    VisualizarProgramasCapacitacionComponent
  ],
  imports: [
    CommonModule,
    VisualizarProgramasCapacitacionRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    VisualizarProgramasCapacitacionComponent
  ]
})
export class VisualizarProgramasCapacitacionModule { }
