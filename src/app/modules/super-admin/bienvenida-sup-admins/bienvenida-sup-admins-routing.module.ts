import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaAdminComponent } from '../../administrador/bienvenida-admin/pages/bienvenida-admin/bienvenida-admin.component';
import { BienvenidaSupAdminsComponent } from './pages/bienvenida-sup-admins/bienvenida-sup-admins.component';

const routes: Routes = [
  {
    path:'',
    component: BienvenidaSupAdminsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaSupAdminsRoutingModule { }
