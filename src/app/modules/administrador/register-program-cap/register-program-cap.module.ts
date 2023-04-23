import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterProgramCapRoutingModule } from './register-program-cap-routing.module';
import { RegisterProgramCapComponent } from './pages/register-program-cap/register-program-cap.component';


@NgModule({
  declarations: [
    RegisterProgramCapComponent
  ],
  imports: [
    CommonModule,
    RegisterProgramCapRoutingModule
  ],exports:[
    RegisterProgramCapComponent
  ]
})
export class RegisterProgramCapModule { }
