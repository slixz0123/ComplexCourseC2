import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaInscripcionRoutingModule } from './ficha-inscripcion-routing.module';
import { FichaInscripcionComponent } from './pages/ficha-inscripcion/ficha-inscripcion.component';


@NgModule({
  declarations: [
    FichaInscripcionComponent
  ],
  imports: [
    CommonModule,
    FichaInscripcionRoutingModule
  ],exports:[
    FichaInscripcionComponent
  ]
})
export class FichaInscripcionModule { }
