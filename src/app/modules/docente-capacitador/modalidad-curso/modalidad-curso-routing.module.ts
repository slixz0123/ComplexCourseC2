import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalidadCursoComponent } from './pages/modalidad-curso.component';

const routes: Routes = [{
  path:'',
  component: ModalidadCursoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalidadCursoRoutingModule { }
