import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListFichaEvaluacionRoutingModule } from './edit-list-ficha-evaluacion-routing.module';
import { EditListFichaEvaluacionComponent } from './pages/edit-list-ficha-evaluacion/edit-list-ficha-evaluacion.component';


@NgModule({
  declarations: [
    EditListFichaEvaluacionComponent
  ],
  imports: [
    CommonModule,
    EditListFichaEvaluacionRoutingModule
  ]
})
export class EditListFichaEvaluacionModule { }
