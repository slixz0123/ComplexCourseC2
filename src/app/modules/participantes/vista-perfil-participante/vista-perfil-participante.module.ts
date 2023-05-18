import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VistaPerfilParticipanteRoutingModule } from './vista-perfil-participante-routing.module';
import { VistaPerfilParticipanteComponent } from './pages/vista-perfil-participante/vista-perfil-participante.component';


@NgModule({
  declarations: [
    VistaPerfilParticipanteComponent
  ],
  imports: [
    CommonModule,
    VistaPerfilParticipanteRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    VistaPerfilParticipanteComponent
  ]
})
export class VistaPerfilParticipanteModule { }
