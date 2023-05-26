import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaCertificadosRoutingModule } from './entrega-certificados-routing.module';
import { FormsModule } from '@angular/forms';
import { EntregaCertificadosComponent } from './pages/entrega-certificados.component';


@NgModule({
  declarations: [
    EntregaCertificadosComponent
  ],
  imports: [
    CommonModule,
    EntregaCertificadosRoutingModule,
    FormsModule
  ],exports:[
    EntregaCertificadosComponent
  ]
})
export class EntregaCertificadosModule { }
