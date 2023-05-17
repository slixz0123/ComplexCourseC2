import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCursoRoutingModule } from './tipo-curso-routing.module';
import { FormsModule } from '@angular/forms';
import { TipoCursoComponent } from './pages/tipo-curso.component';


@NgModule({
  declarations: [
    TipoCursoComponent
  ],
  imports: [
    CommonModule,
    TipoCursoRoutingModule,
    FormsModule
  ]
})
export class TipoCursoModule { }
