import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaSupAdminsRoutingModule } from './bienvenida-sup-admins-routing.module';
import { BienvenidaSupAdminsComponent } from './pages/bienvenida-sup-admins/bienvenida-sup-admins.component';
import { BienvenidaAdminComponent } from '../../administrador/bienvenida-admin/pages/bienvenida-admin/bienvenida-admin.component';


@NgModule({
  declarations: [
    BienvenidaSupAdminsComponent
  ],
  imports: [
    CommonModule,
    BienvenidaSupAdminsRoutingModule
  ],exports:[
    BienvenidaSupAdminsComponent
  ]
})
export class BienvenidaSupAdminsModule { }
