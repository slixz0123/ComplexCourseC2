import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListNecesidadRoutingModule } from './edit-list-necesidad-routing.module';
import { EditListNecesidadComponent } from './pages/edit-list-necesidad/edit-list-necesidad.component';


@NgModule({
  declarations: [
    EditListNecesidadComponent
  ],
  imports: [
    CommonModule,
    EditListNecesidadRoutingModule
  ],exports: [
    EditListNecesidadComponent
  ]
})
export class EditListNecesidadModule { }
