import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterDetalleMEvaRoutingModule } from './register-detalle-meva-routing.module';
import { RegisterDetalleMevaComponent } from './pages/register-detalle-meva/register-detalle-meva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterDetalleMevaComponent
  ],
  imports: [
    CommonModule,
    RegisterDetalleMEvaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterDetalleMEvaModule { }
