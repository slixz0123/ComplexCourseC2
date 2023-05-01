import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListAreaRoutingModule } from './edit-list-area-routing.module';
import { EditListAreaComponent } from './pages/edit-list-area/edit-list-area.component';


@NgModule({
  declarations: [
    EditListAreaComponent
  ],
  imports: [
    CommonModule,
    EditListAreaRoutingModule
  ],
  exports:[
    EditListAreaComponent
  ]
})
export class EditListAreaModule { }
