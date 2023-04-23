import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSilaboRoutingModule } from './register-silabo-routing.module';
import { RegisterSilaboComponent } from './pages/register-silabo/register-silabo.component';


@NgModule({
  declarations: [
    RegisterSilaboComponent
  ],
  imports: [
    CommonModule,
    RegisterSilaboRoutingModule
  ],
  exports:[
    RegisterSilaboComponent
  ]
})
export class RegisterSilaboModule { }
