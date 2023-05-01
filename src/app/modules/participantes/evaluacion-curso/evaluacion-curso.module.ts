import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionCursoRoutingModule } from './evaluacion-curso-routing.module';
import { EvaluacionCursoComponent } from './pages/evaluacion-curso/evaluacion-curso.component';


@NgModule({
  declarations: [
    EvaluacionCursoComponent
  ],
  imports: [
    CommonModule,
    EvaluacionCursoRoutingModule
  ],
  exports:[
    EvaluacionCursoComponent
  ]
})
export class EvaluacionCursoModule { }
