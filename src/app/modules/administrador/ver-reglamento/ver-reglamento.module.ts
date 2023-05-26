import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerReglamentoRoutingModule } from './ver-reglamento-routing.module';
import { VerReglamentoComponent } from './pages/ver-reglamento/ver-reglamento.component';


@NgModule({
  declarations: [
    VerReglamentoComponent
  ],
  imports: [
    CommonModule,
    VerReglamentoRoutingModule
  ],exports:[
    VerReglamentoComponent
  ]
})
export class VerReglamentoModule { }
