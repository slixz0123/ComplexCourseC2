import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
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
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocenteCapacitadorModule { }
