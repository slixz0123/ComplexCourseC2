import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAsistenciaComponent } from './pages/register-asistencia/register-asistencia.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterAsistenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAsistenciaRoutingModule { }
