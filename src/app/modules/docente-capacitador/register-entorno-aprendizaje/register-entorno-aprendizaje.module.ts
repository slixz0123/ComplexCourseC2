import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEntornoAprendizajeRoutingModule } from './register-entorno-aprendizaje-routing.module';
import { RegisterEntornoAprendizajeComponent } from './pages/register-entorno-aprendizaje/register-entorno-aprendizaje.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterEntornoAprendizajeComponent
  ],
  imports: [
    CommonModule,
    RegisterEntornoAprendizajeRoutingModule, 
    FormsModule
  ]
})
export class RegisterEntornoAprendizajeModule { }
