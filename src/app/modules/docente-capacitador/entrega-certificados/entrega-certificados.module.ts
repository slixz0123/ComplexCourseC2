import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaCertificadosRoutingModule } from './entrega-certificados-routing.module';
import { FormsModule } from '@angular/forms';
import { EntregaCertificadosComponent } from './pages/entrega-certificados.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    EntregaCertificadosComponent
  ],
  imports: [
    CommonModule,
    EntregaCertificadosRoutingModule,
    FormsModule
  ]
})
export class EntregaCertificadosModule { }
