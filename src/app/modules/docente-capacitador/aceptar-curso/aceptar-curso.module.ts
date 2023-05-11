import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AceptarCursoRoutingModule } from './aceptar-curso-routing.module';
import { AceptarCursoComponent } from './pages/aceptar-curso.component';


@NgModule({
  declarations: [
    AceptarCursoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AceptarCursoRoutingModule
  ],
  providers:[],
  bootstrap: [AceptarCursoComponent]
})
export class AceptarCursoModule { }
