import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEspecialidadRoutingModule } from './register-especialidad-routing.module';
import { RegisterEspecialidadComponent } from './pages/register-especialidad/register-especialidad.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterEspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegisterEspecialidadRoutingModule,
    FormsModule
  ],exports:[
    RegisterEspecialidadComponent
  ]
})
export class RegisterEspecialidadModule { }
