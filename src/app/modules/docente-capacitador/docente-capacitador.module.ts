import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteCapacitadorRoutingModule } from './docente-capacitador-routing.module';
import { WelcomeDocenteCapacitadorComponent } from './welcome-docente-capacitador/welcome-docente-capacitador.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeDocenteCapacitadorComponent,

   
 
  ],
  imports: [
    CommonModule,
    DocenteCapacitadorRoutingModule,
    SharedModule
  ]
})
export class DocenteCapacitadorModule { }
