import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistaPerfilDocenteRoutingModule } from './vista-perfil-docente-routing.module';
import { VistaPerfilDocenteComponent } from './pages/vista-perfil-docente/vista-perfil-docente.component';


@NgModule({
  declarations: [
    VistaPerfilDocenteComponent
  ],
  imports: [
    CommonModule,
    VistaPerfilDocenteRoutingModule
  ],exports:[
    VistaPerfilDocenteComponent
  ]
})
export class VistaPerfilDocenteModule { }
