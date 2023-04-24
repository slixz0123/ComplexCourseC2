import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaHomeRoutingModule } from './bienvenida-home-routing.module';
import { BienvenidaHomeComponent } from './pages/bienvenida-home/bienvenida-home.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BienvenidaHomeComponent
  ],
  imports: [
    CommonModule,
    BienvenidaHomeRoutingModule,
    SharedModule
  ],exports:[
    BienvenidaHomeComponent
  ]
})
export class BienvenidaHomeModule { }
