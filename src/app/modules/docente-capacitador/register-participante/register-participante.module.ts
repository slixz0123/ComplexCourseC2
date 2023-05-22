import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterParticipanteRoutingModule } from './register-participante-routing.module';
import { RegisterParticipanteComponent } from './pages/register-participante/register-participante.component';

@NgModule({
  declarations: [
    RegisterParticipanteComponent
  ],
  imports: [
    CommonModule,
    RegisterParticipanteRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    RegisterParticipanteComponent
  ]
})
export class RegisterParticipanteModule { }
