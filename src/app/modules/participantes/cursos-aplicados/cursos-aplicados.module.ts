import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CursosAplicadosRoutingModule } from './cursos-aplicados-routing.module';
import { CursosAplicadosComponent } from './pages/cursos-aplicados/cursos-aplicados.component';


@NgModule({
  declarations: [
    CursosAplicadosComponent
  ],
  imports: [
    CommonModule,
    CursosAplicadosRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    CursosAplicadosComponent
  ]
})
export class CursosAplicadosModule { }
