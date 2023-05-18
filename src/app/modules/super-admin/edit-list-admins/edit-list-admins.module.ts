import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListAdminsRoutingModule } from './edit-list-admins-routing.module';
import { EditListAdminsComponent } from './pages/edit-list-admins/edit-list-admins.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditListAdminsComponent
  ],
  imports: [
    CommonModule,
    EditListAdminsRoutingModule,
    FormsModule

  ],exports:[
    EditListAdminsComponent
  ]
})
export class EditListAdminsModule { }
