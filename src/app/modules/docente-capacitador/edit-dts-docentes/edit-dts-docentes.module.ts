import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDtsDocentesRoutingModule } from './edit-dts-docentes-routing.module';
import { EditDtsDocentesComponent } from './pages/edit-dts-docentes/edit-dts-docentes.component';


@NgModule({
  declarations: [
    EditDtsDocentesComponent
  ],
  imports: [
    CommonModule,
    EditDtsDocentesRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    EditDtsDocentesComponent
  ],
   bootstrap: [EditDtsDocentesComponent]
})
export class EditDtsDocentesModule { }
