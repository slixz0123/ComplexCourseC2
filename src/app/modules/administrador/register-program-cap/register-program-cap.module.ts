import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterProgramCapRoutingModule } from './register-program-cap-routing.module';
import { RegisterProgramCapComponent } from './pages/register-program-cap/register-program-cap.component';


@NgModule({
  declarations: [
    RegisterProgramCapComponent
  ],
  imports: [
    CommonModule,
    RegisterProgramCapRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    RegisterProgramCapComponent
  ]
})
export class RegisterProgramCapModule { }
