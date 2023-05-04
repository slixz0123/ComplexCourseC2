import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListDiasRoutingModule } from './edit-list-dias-routing.module';
import { EditListDiasComponent } from './pages/edit-list-dias/edit-list-dias.component';


@NgModule({
  declarations: [
    EditListDiasComponent
  ],
  imports: [
    CommonModule,
    EditListDiasRoutingModule
  ],exports:[
    EditListDiasComponent
  ]
})
export class EditListDiasModule { }
