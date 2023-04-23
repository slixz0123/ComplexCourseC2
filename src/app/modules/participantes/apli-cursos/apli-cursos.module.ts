import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApliCursosRoutingModule } from './apli-cursos-routing.module';
import { ApliCursosComponent } from './pages/apli-cursos/apli-cursos.component';


@NgModule({
  declarations: [
    ApliCursosComponent
  ],
  imports: [
    CommonModule,
    ApliCursosRoutingModule
  ],exports:[
    ApliCursosComponent
  ]
})
export class ApliCursosModule { }
