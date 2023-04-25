import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUsrRoutingModule } from './register-usr-routing.module';
import { RegisterUsrComponent } from './pages/register-usr/register-usr.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegisterUsrComponent
  ],
  imports: [
    CommonModule,
    RegisterUsrRoutingModule,
    SharedModule
  ],
  exports:[
    RegisterUsrComponent
  ]
})
export class RegisterUsrModule { }
