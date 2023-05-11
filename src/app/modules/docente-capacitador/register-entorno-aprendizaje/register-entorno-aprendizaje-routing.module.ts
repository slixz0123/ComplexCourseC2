import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEntornoAprendizajeComponent } from './pages/register-entorno-aprendizaje/register-entorno-aprendizaje.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterEntornoAprendizajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEntornoAprendizajeRoutingModule { }
