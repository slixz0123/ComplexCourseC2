import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListNotasRoutingModule } from './edit-list-notas-routing.module';
import { EditListNotasComponent } from './pages/edit-list-notas/edit-list-notas.component';


@NgModule({
  declarations: [
    EditListNotasComponent
  ],
  imports: [
    CommonModule,
    EditListNotasRoutingModule
  ],
  exports:[
    EditListNotasComponent
  ]
})
export class EditListNotasModule { }
