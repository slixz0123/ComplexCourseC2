import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FichaInscripcionRoutingModule } from './ficha-inscripcion-routing.module';
import { FichaInscripcionComponent } from './pages/ficha-inscripcion/ficha-inscripcion.component';


@NgModule({
  declarations: [
    FichaInscripcionComponent
  ],
  imports: [
    CommonModule,
    FichaInscripcionRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    FichaInscripcionComponent
  ]
})
export class FichaInscripcionModule { }
