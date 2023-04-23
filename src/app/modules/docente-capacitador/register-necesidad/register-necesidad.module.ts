import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterNecesidadRoutingModule } from './register-necesidad-routing.module';
import { RegisterNecesidadComponent } from './pages/register-necesidad/register-necesidad.component';


@NgModule({
  declarations: [
    RegisterNecesidadComponent
  ],
  imports: [
    CommonModule,
    RegisterNecesidadRoutingModule
  ],
  exports:[
    RegisterNecesidadComponent
  ]
})
export class RegisterNecesidadModule { }
