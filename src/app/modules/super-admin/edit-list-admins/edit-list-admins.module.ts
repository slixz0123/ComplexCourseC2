import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListAdminsRoutingModule } from './edit-list-admins-routing.module';
import { EditListAdminsComponent } from './pages/edit-list-admins/edit-list-admins.component';


@NgModule({
  declarations: [
    EditListAdminsComponent
  ],
  imports: [
    CommonModule,
    EditListAdminsRoutingModule
  ],exports:[
    EditListAdminsComponent
  ]
})
export class EditListAdminsModule { }
