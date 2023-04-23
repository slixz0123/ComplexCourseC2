import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaAdminComponent } from './pages/bienvenida-admin/bienvenida-admin.component';

const routes: Routes = [
  {
    path:'',
    component: BienvenidaAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaAdminRoutingModule { }
