import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionCursoComponent } from './pages/evaluacion-curso/evaluacion-curso.component';

const routes: Routes = [
  {
    path:'',
    component: EvaluacionCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionCursoRoutingModule { }
