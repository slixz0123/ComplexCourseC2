import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAdminsRoutingModule } from './register-admins-routing.module';
import { RegisterAdminsComponent } from './pages/register-admins/register-admins.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterAdminsComponent
  ],
  imports: [
    CommonModule,
    RegisterAdminsRoutingModule,
    FormsModule
  ],exports:[
    RegisterAdminsComponent
  ]
})
export class RegisterAdminsModule { }
