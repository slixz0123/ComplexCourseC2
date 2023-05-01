import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDtsDocentesRoutingModule } from './edit-dts-docentes-routing.module';
import { EditDtsDocentesComponent } from './pages/edit-dts-docentes/edit-dts-docentes.component';


@NgModule({
  declarations: [
    EditDtsDocentesComponent
  ],
  imports: [
    CommonModule,
    EditDtsDocentesRoutingModule
  ],
  exports:[
    EditDtsDocentesComponent
  ]
})
export class EditDtsDocentesModule { }
