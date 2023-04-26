import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterProfesorRoutingModule } from './register-profesor-routing.module';
import { RegisterProfesorComponent } from './pages/register-profesor/register-profesor.component';


@NgModule({
  declarations: [
    RegisterProfesorComponent
  ],
  imports: [
    CommonModule,
    RegisterProfesorRoutingModule
  ],exports:[
    RegisterProfesorComponent
  ]
})
export class RegisterProfesorModule { }
