import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAreaComponent } from './pages/register-area/register-area.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAreaRoutingModule { }
