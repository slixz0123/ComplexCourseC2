import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListAsistenciaRoutingModule } from './edit-list-asistencia-routing.module';
import { EditListAsistenciaComponent } from './pages/edit-list-asistencia/edit-list-asistencia.component';


@NgModule({
  declarations: [
    EditListAsistenciaComponent
  ],
  imports: [
    CommonModule,
    EditListAsistenciaRoutingModule
  ],
  exports:[
    EditListAsistenciaComponent
  ]
})
export class EditListAsistenciaModule { }
