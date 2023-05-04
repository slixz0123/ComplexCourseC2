import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListProfesorRoutingModule } from './edit-list-profesor-routing.module';
import { EditListProfesorComponent } from './pages/edit-list-profesor/edit-list-profesor.component';


@NgModule({
  declarations: [
    EditListProfesorComponent
  ],
  imports: [
    CommonModule,
    EditListProfesorRoutingModule
  ],exports:[
    EditListProfesorComponent
  ]
})
export class EditListProfesorModule { }
