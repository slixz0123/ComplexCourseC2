import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosCursoComponent } from './pages/horarios-curso.component';

const routes: Routes = [
  {
    path:'',
    component: HorariosCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosCursoRoutingModule { }
