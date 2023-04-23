import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaParticipantesComponent } from './pages/bienvenida-participantes/bienvenida-participantes.component';

const routes: Routes = [
  {
    path:'',
    component: BienvenidaParticipantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaParticipantesRoutingModule { }
