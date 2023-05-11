import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VistaPerfilDocenteRoutingModule } from './vista-perfil-docente-routing.module';
import { VistaPerfilDocenteComponent } from './pages/vista-perfil-docente/vista-perfil-docente.component';


@NgModule({
  declarations: [
    VistaPerfilDocenteComponent
  ],
  imports: [
    CommonModule,
    VistaPerfilDocenteRoutingModule, SharedModule,
    FormsModule,
    HttpClientModule,
  ],exports:[
    VistaPerfilDocenteComponent
  ]
})
export class VistaPerfilDocenteModule { }
