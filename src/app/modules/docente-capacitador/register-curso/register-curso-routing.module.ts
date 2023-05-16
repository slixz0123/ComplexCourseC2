import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminsComponent } from '../../super-admin/register-admins/pages/register-admins/register-admins.component';
import { RegisterCursoComponent } from './pages/register-curso/register-curso.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterCursoRoutingModule { }
