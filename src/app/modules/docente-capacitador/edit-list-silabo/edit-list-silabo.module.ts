import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListSilaboRoutingModule } from './edit-list-silabo-routing.module';
import { EditListSilaboComponent } from './pages/edit-list-silabo/edit-list-silabo.component';


@NgModule({
  declarations: [
    EditListSilaboComponent
  ],
  imports: [
    CommonModule,
    EditListSilaboRoutingModule
  ],
  exports:[
    EditListSilaboComponent
  ]
})
export class EditListSilaboModule { }
