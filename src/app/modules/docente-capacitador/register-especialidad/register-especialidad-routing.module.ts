import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEspecialidadComponent } from './pages/register-especialidad/register-especialidad.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterEspecialidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEspecialidadRoutingModule { }
