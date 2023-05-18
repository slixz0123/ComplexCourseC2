import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDtsParticipanteRoutingModule } from './edit-dts-participante-routing.module';
import { EditDtsParticipanteComponent } from './pages/edit-dts-participante/edit-dts-participante.component';

@NgModule({
  declarations: [
    EditDtsParticipanteComponent
  ],
  imports: [
    CommonModule,
    EditDtsParticipanteRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    EditDtsParticipanteComponent
  ]
})
export class EditDtsParticipanteModule { }
