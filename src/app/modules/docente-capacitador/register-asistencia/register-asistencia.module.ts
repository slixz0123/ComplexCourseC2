import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAsistenciaRoutingModule } from './register-asistencia-routing.module';
import { RegisterAsistenciaComponent } from './pages/register-asistencia/register-asistencia.component';


@NgModule({
  declarations: [
    RegisterAsistenciaComponent
  ],
  imports: [
    CommonModule,
    RegisterAsistenciaRoutingModule
  ],
  exports:[
    RegisterAsistenciaComponent
  ]
})
export class RegisterAsistenciaModule { }
