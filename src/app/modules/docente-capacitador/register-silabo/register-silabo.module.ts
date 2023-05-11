import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSilaboRoutingModule } from './register-silabo-routing.module';
import { RegisterSilaboComponent } from './pages/register-silabo/register-silabo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterSilaboComponent
  ],
  imports: [
    CommonModule,
    RegisterSilaboRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterSilaboComponent
  ]
})
export class RegisterSilaboModule { }
