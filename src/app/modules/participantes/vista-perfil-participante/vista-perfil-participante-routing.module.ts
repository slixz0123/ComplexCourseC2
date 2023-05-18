import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPerfilParticipanteComponent } from './pages/vista-perfil-participante/vista-perfil-participante.component';

const routes: Routes = [
  {path:'',
    component: VistaPerfilParticipanteComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaPerfilParticipanteRoutingModule { }
