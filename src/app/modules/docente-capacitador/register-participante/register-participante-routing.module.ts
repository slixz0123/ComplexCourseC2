import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterParticipanteComponent } from './pages/register-participante/register-participante.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterParticipanteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterParticipanteRoutingModule { }
