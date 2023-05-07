import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterMecanismoEvaRoutingModule } from './register-mecanismo-eva-routing.module';
import { RegisterMecanismoEvaComponent } from './pages/register-mecanismo-eva/register-mecanismo-eva.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterMecanismoEvaComponent
  ],
  imports: [
    CommonModule,
    RegisterMecanismoEvaRoutingModule,
    FormsModule
  ],exports:[
    RegisterMecanismoEvaComponent
  ]
})
export class RegisterMecanismoEvaModule { }
