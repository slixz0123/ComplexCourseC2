import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAsistenciaRoutingModule } from './register-asistencia-routing.module';
import { RegisterAsistenciaComponent } from './pages/register-asistencia/register-asistencia.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterAsistenciaComponent
  ],
  imports: [
    CommonModule,
    RegisterAsistenciaRoutingModule,
    FormsModule
  ],
  exports:[
    RegisterAsistenciaComponent
  ]
})
export class RegisterAsistenciaModule { }
