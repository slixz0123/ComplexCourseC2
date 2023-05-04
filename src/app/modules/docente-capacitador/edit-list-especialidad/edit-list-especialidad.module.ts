import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListEspecialidadRoutingModule } from './edit-list-especialidad-routing.module';
import { EditListEspecialidadComponent } from './pages/edit-list-especialidad/edit-list-especialidad.component';


@NgModule({
  declarations: [
    EditListEspecialidadComponent
  ],
  imports: [
    CommonModule,
    EditListEspecialidadRoutingModule
  ],exports:[
    EditListEspecialidadComponent
  ]
})
export class EditListEspecialidadModule { }
