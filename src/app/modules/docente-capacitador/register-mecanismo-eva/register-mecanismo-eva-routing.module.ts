import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterMecanismoEvaComponent } from './pages/register-mecanismo-eva/register-mecanismo-eva.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterMecanismoEvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterMecanismoEvaRoutingModule { }
