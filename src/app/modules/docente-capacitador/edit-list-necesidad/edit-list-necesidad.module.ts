import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListNecesidadRoutingModule } from './edit-list-necesidad-routing.module';
import { EditListNecesidadComponent } from './pages/edit-list-necesidad/edit-list-necesidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditListNecesidadComponent
  ],
  imports: [
    CommonModule,
    EditListNecesidadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports: [
    EditListNecesidadComponent
  ]
})
export class EditListNecesidadModule { }
