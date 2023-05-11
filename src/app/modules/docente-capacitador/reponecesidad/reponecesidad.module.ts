import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReponecesidadRoutingModule } from './reponecesidad-routing.module';
import { ReponecesidadComponent } from './pages/reponecesidad/reponecesidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReponecesidadComponent
  ],
  imports: [
    CommonModule,
    ReponecesidadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    ReponecesidadComponent
  ]
})
export class ReponecesidadModule { }
