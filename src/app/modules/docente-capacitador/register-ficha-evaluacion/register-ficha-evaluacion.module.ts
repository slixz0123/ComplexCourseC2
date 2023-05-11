import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterFichaEvaluacionRoutingModule } from './register-ficha-evaluacion-routing.module';
import { RegisterFichaEvaluacionComponent } from './pages/register-ficha-evaluacion/register-ficha-evaluacion.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterFichaEvaluacionComponent
  ],
  imports: [
    CommonModule,
    RegisterFichaEvaluacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ], exports:[
    RegisterFichaEvaluacionComponent
  ]
})
export class RegisterFichaEvaluacionModule { }
