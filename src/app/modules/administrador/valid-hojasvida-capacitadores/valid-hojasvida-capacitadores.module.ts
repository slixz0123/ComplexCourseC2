import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidHojasvidaCapacitadoresRoutingModule } from './valid-hojasvida-capacitadores-routing.module';
import { ValidHojasvidaCapacitadoresComponent } from './pages/valid-hojasvida-capacitadores/valid-hojasvida-capacitadores.component';


@NgModule({
  declarations: [
    ValidHojasvidaCapacitadoresComponent
  ],
  imports: [
    CommonModule,
    ValidHojasvidaCapacitadoresRoutingModule
  ],
  exports:[
    ValidHojasvidaCapacitadoresComponent
  ]
})
export class ValidHojasvidaCapacitadoresModule { }
