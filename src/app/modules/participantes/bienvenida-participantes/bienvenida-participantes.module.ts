import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaParticipantesRoutingModule } from './bienvenida-participantes-routing.module';
import { BienvenidaParticipantesComponent } from './pages/bienvenida-participantes/bienvenida-participantes.component';


@NgModule({
  declarations: [
    BienvenidaParticipantesComponent
  ],
  imports: [
    CommonModule,
    BienvenidaParticipantesRoutingModule
  ],
  exports:[
    BienvenidaParticipantesComponent
  ]
})
export class BienvenidaParticipantesModule { }
