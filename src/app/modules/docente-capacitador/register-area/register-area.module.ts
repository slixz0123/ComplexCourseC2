import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAreaRoutingModule } from './register-area-routing.module';
import { RegisterAreaComponent } from './pages/register-area/register-area.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RegisterAreaComponent
  ],
  imports: [
    CommonModule,
    RegisterAreaRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],exports:[
    RegisterAreaComponent
  ]
})
export class RegisterAreaModule { }
