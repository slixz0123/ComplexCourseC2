import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterDisenoCurricularRoutingModule } from './register-diseno-curricular-routing.module';
import { RegiserDisenoCurricularComponent } from './pages/regiser-diseno-curricular/regiser-diseno-curricular.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegiserDisenoCurricularComponent
  ],
  imports: [
    CommonModule,
    RegisterDisenoCurricularRoutingModule,
    FormsModule
  ],
  exports:[
    RegiserDisenoCurricularComponent
  ]
})
export class RegisterDisenoCurricularModule { }
