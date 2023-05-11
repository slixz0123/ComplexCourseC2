import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterDetalleMevaComponent } from './pages/register-detalle-meva/register-detalle-meva.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterDetalleMevaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterDetalleMEvaRoutingModule { }
