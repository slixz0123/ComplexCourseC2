import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUsrRoutingModule } from './register-usr-routing.module';
import { RegisterUsrComponent } from './pages/register-usr/register-usr.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    RegisterUsrComponent
  ],
  imports: [
    CommonModule,
    RegisterUsrRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
 
  ],
  exports:[
    RegisterUsrComponent
  ]
})
export class RegisterUsrModule { }
