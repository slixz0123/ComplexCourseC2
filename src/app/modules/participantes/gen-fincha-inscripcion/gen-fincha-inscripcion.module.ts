import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenFinchaInscripcionRoutingModule } from './gen-fincha-inscripcion-routing.module';
import { GenFinchaInscripcionComponent } from './pages/gen-fincha-inscripcion/gen-fincha-inscripcion.component';


@NgModule({
  declarations: [
    GenFinchaInscripcionComponent
  ],
  imports: [
    CommonModule,
    GenFinchaInscripcionRoutingModule
  ],exports:[
    GenFinchaInscripcionComponent
  ]
})
export class GenFinchaInscripcionModule { }
