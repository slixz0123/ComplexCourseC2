import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterFichaEvaluacionRoutingModule } from './register-ficha-evaluacion-routing.module';
import { RegisterFichaEvaluacionComponent } from './pages/register-ficha-evaluacion/register-ficha-evaluacion.component';


@NgModule({
  declarations: [
    RegisterFichaEvaluacionComponent
  ],
  imports: [
    CommonModule,
    RegisterFichaEvaluacionRoutingModule

  ], exports:[
    RegisterFichaEvaluacionComponent
  ]
})
export class RegisterFichaEvaluacionModule { }
