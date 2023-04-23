import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterDisenoCurricularRoutingModule } from './register-diseno-curricular-routing.module';
import { RegiserDisenoCurricularComponent } from './pages/regiser-diseno-curricular/regiser-diseno-curricular.component';


@NgModule({
  declarations: [
    RegiserDisenoCurricularComponent
  ],
  imports: [
    CommonModule,
    RegisterDisenoCurricularRoutingModule
  ],
  exports:[
    RegiserDisenoCurricularComponent
  ]
})
export class RegisterDisenoCurricularModule { }
