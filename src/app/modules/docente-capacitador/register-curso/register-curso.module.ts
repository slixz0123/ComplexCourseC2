import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCursoRoutingModule } from './register-curso-routing.module';
import { RegisterCursoComponent } from './pages/register-curso/register-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterCursoComponent
  ],
  imports: [
    CommonModule,
    RegisterCursoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    RegisterCursoComponent
  ]
})
export class RegisterCursoModule { }
