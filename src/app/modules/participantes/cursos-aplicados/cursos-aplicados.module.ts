import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosAplicadosRoutingModule } from './cursos-aplicados-routing.module';
import { CursosAplicadosComponent } from './pages/cursos-aplicados/cursos-aplicados.component';


@NgModule({
  declarations: [
    CursosAplicadosComponent
  ],
  imports: [
    CommonModule,
    CursosAplicadosRoutingModule
  ],
  exports:[
    CursosAplicadosComponent
  ]
})
export class CursosAplicadosModule { }
