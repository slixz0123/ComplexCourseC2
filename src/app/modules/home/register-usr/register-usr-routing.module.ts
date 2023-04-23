import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUsrComponent } from './pages/register-usr/register-usr.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterUsrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterUsrRoutingModule { }
