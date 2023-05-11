import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListDiasRoutingModule } from './edit-list-dias-routing.module';
import { EditListDiasComponent } from './pages/edit-list-dias/edit-list-dias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditListDiasComponent
  ],
  imports: [
    CommonModule,
    EditListDiasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    EditListDiasComponent
  ]
})
export class EditListDiasModule { }
