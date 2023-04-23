import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaAdminRoutingModule } from './bienvenida-admin-routing.module';
import { BienvenidaAdminComponent } from './pages/bienvenida-admin/bienvenida-admin.component';


@NgModule({
  declarations: [
    BienvenidaAdminComponent
  ],
  imports: [
    CommonModule,
    BienvenidaAdminRoutingModule
  ],exports:[
    BienvenidaAdminComponent
  ]
})
export class BienvenidaAdminModule { }
