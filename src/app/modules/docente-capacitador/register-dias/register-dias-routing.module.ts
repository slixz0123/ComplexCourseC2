import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterDiasComponent } from './pages/register-dias/register-dias.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterDiasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterDiasRoutingModule { }
