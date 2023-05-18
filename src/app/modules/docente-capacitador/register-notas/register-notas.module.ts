import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterNotasRoutingModule } from './register-notas-routing.module';
import { RegisterNotasComponent } from './pages/register-notas/register-notas.component';


@NgModule({
  declarations: [
    RegisterNotasComponent
  ],
  imports: [
    CommonModule,
    RegisterNotasRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    RegisterNotasComponent
  ]
})
export class RegisterNotasModule { }
