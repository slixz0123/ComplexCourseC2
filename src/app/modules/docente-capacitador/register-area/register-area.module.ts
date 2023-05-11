import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAreaRoutingModule } from './register-area-routing.module';
import { RegisterAreaComponent } from './pages/register-area/register-area.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterAreaComponent
  ],
  imports: [
    CommonModule,
    RegisterAreaRoutingModule,
    FormsModule
  ],exports:[
    RegisterAreaComponent
  ]
})
export class RegisterAreaModule { }
