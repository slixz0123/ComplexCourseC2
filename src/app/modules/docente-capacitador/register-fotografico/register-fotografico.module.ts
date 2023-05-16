import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterFotograficoRoutingModule } from './register-fotografico-routing.module';
import { RegistroFotograficoComponent } from './pages/register-fotografico/register-fotografico.component';

@NgModule({
  declarations: [
    RegistroFotograficoComponent
  ],
  imports: [
    CommonModule,
    RegisterFotograficoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterFotograficoModule { }
