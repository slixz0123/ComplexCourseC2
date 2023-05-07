import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterDiasRoutingModule } from './register-dias-routing.module';
import { RegisterDiasComponent } from './pages/register-dias/register-dias.component';
import { FormGroup, FormGroupName, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterDiasComponent
  ],
  imports: [
    CommonModule,
    RegisterDiasRoutingModule,
    FormsModule,
 ReactiveFormsModule
    
  ],exports:[
    RegisterDiasComponent
  ]
})
export class RegisterDiasModule { }
