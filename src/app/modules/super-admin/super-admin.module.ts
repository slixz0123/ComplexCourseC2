import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WelcomeSupAdminComponent } from './welcome-sup-admin/welcome-sup-admin.component';


@NgModule({
  declarations: [
   
    WelcomeSupAdminComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
