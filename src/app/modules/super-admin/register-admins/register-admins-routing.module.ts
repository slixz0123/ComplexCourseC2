import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminsComponent } from './pages/register-admins/register-admins.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterAdminsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAdminsRoutingModule { }
