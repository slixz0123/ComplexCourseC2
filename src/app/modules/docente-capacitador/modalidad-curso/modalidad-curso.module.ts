import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalidadCursoRoutingModule } from './modalidad-curso-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalidadCursoComponent } from './pages/modalidad-curso.component';


@NgModule({
  declarations: [
    ModalidadCursoComponent,
  ],
  imports: [
    CommonModule,
    ModalidadCursoRoutingModule,
    FormsModule,
  ]
})
export class ModalidadCursoModule { }
