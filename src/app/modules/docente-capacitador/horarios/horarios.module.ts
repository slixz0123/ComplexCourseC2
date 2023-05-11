import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { FormsModule } from '@angular/forms';
import { HorariosComponent } from './pages/horarios.component';


@NgModule({
  declarations: [
    HorariosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HorariosRoutingModule
  ],
  providers: [],
  bootstrap: [HorariosComponent]
})
export class HorariosModule { }
