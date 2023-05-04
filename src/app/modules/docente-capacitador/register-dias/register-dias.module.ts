import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterDiasRoutingModule } from './register-dias-routing.module';
import { RegisterDiasComponent } from './pages/register-dias/register-dias.component';


@NgModule({
  declarations: [
    RegisterDiasComponent
  ],
  imports: [
    CommonModule,
    RegisterDiasRoutingModule
  ],exports:[
    RegisterDiasComponent
  ]
})
export class RegisterDiasModule { }
