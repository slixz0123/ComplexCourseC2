import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterInstitucionRoutingModule } from './register-institucion-routing.module';
import { RegisterInstitucionComponent } from './pages/register-institucion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    RegisterInstitucionComponent
  ],
  imports: [
    CommonModule,
    RegisterInstitucionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ], exports:[
    RegisterInstitucionComponent
  ]
})
export class RegisterInstitucionModule { }
