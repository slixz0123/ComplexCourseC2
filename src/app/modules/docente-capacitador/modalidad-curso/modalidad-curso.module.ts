import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalidadCursoRoutingModule } from './modalidad-curso-routing.module';
import { ModalidadCursoComponent } from './pages/modalidad-curso.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalidadCursoComponent
  ],
  imports: [
    CommonModule,
    ModalidadCursoRoutingModule,
    FormsModule
  ],exports:[
    ModalidadCursoComponent
  ]
})
export class ModalidadCursoModule { }
