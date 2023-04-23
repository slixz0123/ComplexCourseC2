import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNotasComponent } from './pages/register-notas/register-notas.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterNotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterNotasRoutingModule { }
