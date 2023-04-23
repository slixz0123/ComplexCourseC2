import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidCursosCapRoutingModule } from './valid-cursos-cap-routing.module';
import { ValidCursosCapComponent } from './pages/valid-cursos-cap/valid-cursos-cap.component';


@NgModule({
  declarations: [
    ValidCursosCapComponent
  ],
  imports: [
    CommonModule,
    ValidCursosCapRoutingModule
  ],
  exports:[
    ValidCursosCapComponent
  ]
})
export class ValidCursosCapModule { }
