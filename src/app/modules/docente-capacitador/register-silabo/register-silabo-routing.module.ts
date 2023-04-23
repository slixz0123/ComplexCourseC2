import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSilaboComponent } from './pages/register-silabo/register-silabo.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterSilaboComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterSilaboRoutingModule { }
