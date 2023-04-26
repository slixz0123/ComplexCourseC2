import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterProfesorRoutingModule } from './register-profesor-routing.module';
import { RegisterProfesorComponent } from './pages/register-profesor/register-profesor.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterProfesorComponent
  ],
  imports: [
    CommonModule,
    RegisterProfesorRoutingModule,
    FormsModule
  ],exports:[
    RegisterProfesorComponent
  ]
})
export class RegisterProfesorModule { }
