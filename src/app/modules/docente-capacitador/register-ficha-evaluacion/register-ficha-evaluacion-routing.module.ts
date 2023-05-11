import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFichaEvaluacionComponent } from './pages/register-ficha-evaluacion/register-ficha-evaluacion.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterFichaEvaluacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFichaEvaluacionRoutingModule { }
