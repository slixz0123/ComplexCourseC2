import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListSilaboRoutingModule } from './edit-list-silabo-routing.module';
import { EditListSilaboComponent } from './pages/edit-list-silabo/edit-list-silabo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditListSilaboComponent
  ],
  imports: [
    CommonModule,
    EditListSilaboRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    EditListSilaboComponent
  ]
})
export class EditListSilaboModule { }
