import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNecesidadComponent } from './pages/register-necesidad/register-necesidad.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterNecesidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterNecesidadRoutingModule { }
