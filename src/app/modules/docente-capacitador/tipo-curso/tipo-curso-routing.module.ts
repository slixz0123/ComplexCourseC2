import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoCursoComponent } from './pages/tipo-curso.component';

const routes: Routes = [
  {
    path:'',
    component: TipoCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCursoRoutingModule { }
