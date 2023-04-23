import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaHomeRoutingModule } from './bienvenida-home-routing.module';
import { BienvenidaHomeComponent } from './pages/bienvenida-home/bienvenida-home.component';


@NgModule({
  declarations: [
    BienvenidaHomeComponent
  ],
  imports: [
    CommonModule,
    BienvenidaHomeRoutingModule
  ],exports:[
    BienvenidaHomeComponent
  ]
})
export class BienvenidaHomeModule { }
