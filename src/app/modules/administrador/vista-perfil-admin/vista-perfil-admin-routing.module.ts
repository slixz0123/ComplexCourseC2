import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPerfilAdminComponent } from './pages/vista-perfil-admin/vista-perfil-admin.component';

const routes: Routes = [
  {path:'',
    component: VistaPerfilAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaPerfilAdminRoutingModule { }
