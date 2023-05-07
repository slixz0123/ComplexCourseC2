import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterNecesidadRoutingModule } from './register-necesidad-routing.module';
import { RegisterNecesidadComponent } from './pages/register-necesidad/register-necesidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterNecesidadComponent
  ],
  imports: [
    CommonModule,
    RegisterNecesidadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterNecesidadComponent
  ]
})
export class RegisterNecesidadModule { }
