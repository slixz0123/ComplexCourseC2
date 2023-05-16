import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GenFinchaInscripcionRoutingModule } from './gen-fincha-inscripcion-routing.module';
import { GenFinchaInscripcionComponent } from './pages/gen-fincha-inscripcion/gen-fincha-inscripcion.component';


@NgModule({
  declarations: [
    GenFinchaInscripcionComponent
  ],
  imports: [
    CommonModule,
    GenFinchaInscripcionRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
  ],exports:[
    GenFinchaInscripcionComponent
  ]
})
export class GenFinchaInscripcionModule { }
