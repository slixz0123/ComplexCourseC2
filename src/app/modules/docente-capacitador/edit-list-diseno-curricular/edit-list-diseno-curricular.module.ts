import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditListDisenoCurricularRoutingModule } from './edit-list-diseno-curricular-routing.module';
import { EditListDisenoCurricularComponent } from './pages/edit-list-diseno-curricular/edit-list-diseno-curricular.component';


@NgModule({
  declarations: [
    EditListDisenoCurricularComponent
  ],
  imports: [
    CommonModule,
    EditListDisenoCurricularRoutingModule
  ],
  exports:[
    EditListDisenoCurricularComponent
  ]
})
export class EditListDisenoCurricularModule { }
