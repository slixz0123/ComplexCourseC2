import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApliCursosComponent } from './pages/apli-cursos/apli-cursos.component';

const routes: Routes = [
  {
    path:'',
    component: ApliCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApliCursosRoutingModule { }
