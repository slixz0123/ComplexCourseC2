import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   //register-admins
   {
    path: 'Home-Sup-Admin',
    loadChildren: () => import(".//bienvenida-sup-admins/bienvenida-sup-admins.module").then(m => m.BienvenidaSupAdminsModule)
  },
   //registrar administradores
   {
    path: 'Register-Admin',
    loadChildren: () => import("./register-admins/register-admins.module").then(m => m.RegisterAdminsModule)
  },
   //editar listar administradores
   {
    path: 'edit-list-Admin',
    loadChildren: () => import("./edit-list-admins/edit-list-admins.module").then(m => m.EditListAdminsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
