import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPerfilDocenteComponent } from './pages/vista-perfil-docente/vista-perfil-docente.component';

const routes: Routes = [
  {
    path:'',
    component: VistaPerfilDocenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaPerfilDocenteRoutingModule { }
