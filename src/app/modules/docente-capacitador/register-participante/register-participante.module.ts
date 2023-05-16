import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterParticipanteRoutingModule } from './register-participante-routing.module';
import { RegisterParticipanteComponent } from './pages/register-participante/register-participante.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterParticipanteComponent
  ],
  imports: [
    CommonModule,
    RegisterParticipanteRoutingModule,
    FormsModule
  ]
})
export class RegisterParticipanteModule { }
