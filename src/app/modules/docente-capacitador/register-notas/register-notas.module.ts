import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterNotasRoutingModule } from './register-notas-routing.module';
import { RegisterNotasComponent } from './pages/register-notas/register-notas.component';


@NgModule({
  declarations: [
    RegisterNotasComponent
  ],
  imports: [
    CommonModule,
    RegisterNotasRoutingModule
  ],
  exports:[
    RegisterNotasComponent
  ]
})
export class RegisterNotasModule { }
