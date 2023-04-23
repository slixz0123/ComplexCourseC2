import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarProgramasCapacitacionComponent } from './pages/visualizar-programas-capacitacion/visualizar-programas-capacitacion.component';

const routes: Routes = [
  {
    path:'',
    component: VisualizarProgramasCapacitacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizarProgramasCapacitacionRoutingModule { }
