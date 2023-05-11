import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantesRoutingModule } from './participantes-routing.module';
import { WelcomeParticipantesComponent } from './welcome-participantes/welcome-participantes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeParticipantesComponent,
  ],
  imports: [
    CommonModule,
    ParticipantesRoutingModule,
    SharedModule
  ]
})
export class ParticipantesModule { }
