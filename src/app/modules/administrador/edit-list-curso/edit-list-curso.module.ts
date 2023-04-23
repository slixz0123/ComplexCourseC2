import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListCursoRoutingModule } from './edit-list-curso-routing.module';
import { EditListCursoComponent } from './pages/edit-list-curso/edit-list-curso.component';


@NgModule({
  declarations: [
    EditListCursoComponent
  ],
  imports: [
    CommonModule,
    EditListCursoRoutingModule
  ],exports:[
    EditListCursoComponent
  ]
})
export class EditListCursoModule { }
