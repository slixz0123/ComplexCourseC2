import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaCapacitadorRoutingModule } from './bienvenida-capacitador-routing.module';
import { BienvenidaCapacitadorComponent } from './pages/bienvenida-capacitador/bienvenida-capacitador.component';


@NgModule({
  declarations: [
    BienvenidaCapacitadorComponent
  ],
  imports: [
    CommonModule,
    BienvenidaCapacitadorRoutingModule
  ],
  exports:[
    BienvenidaCapacitadorComponent
  ]
})
export class BienvenidaCapacitadorModule { }
