import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAreaRoutingModule } from './register-area-routing.module';
import { RegisterAreaComponent } from './pages/register-area/register-area.component';


@NgModule({
  declarations: [
    RegisterAreaComponent
  ],
  imports: [
    CommonModule,
    RegisterAreaRoutingModule
  ],exports:[
    RegisterAreaComponent
  ]
})
export class RegisterAreaModule { }
