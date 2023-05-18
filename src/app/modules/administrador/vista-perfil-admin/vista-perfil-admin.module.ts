import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VistaPerfilAdminRoutingModule } from './vista-perfil-admin-routing.module';
import { VistaPerfilAdminComponent } from './pages/vista-perfil-admin/vista-perfil-admin.component';

@NgModule({
  declarations: [
    VistaPerfilAdminComponent
  ],
  imports: [
    CommonModule,
    VistaPerfilAdminRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    VistaPerfilAdminComponent
  ]
})
export class VistaPerfilAdminModule { }
