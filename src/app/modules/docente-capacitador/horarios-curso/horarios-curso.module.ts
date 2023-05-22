import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosCursoRoutingModule } from './horarios-curso-routing.module';
import { FormsModule } from '@angular/forms';
import { HorariosCursoComponent } from './pages/horarios-curso.component';


@NgModule({
  declarations: [
    HorariosCursoComponent
  ],
  imports: [
    CommonModule,
    HorariosCursoRoutingModule,
    FormsModule
  ],exports:[
    HorariosCursoComponent
  ]
})
export class HorariosCursoModule { }
