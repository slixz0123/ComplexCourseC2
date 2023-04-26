import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProfesorComponent } from './pages/register-profesor/register-profesor.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterProfesorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProfesorRoutingModule { }
