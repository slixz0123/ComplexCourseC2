import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListCursoComponent } from './pages/edit-list-curso/edit-list-curso.component';

const routes: Routes = [
  {
    path:'',
    component: EditListCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListCursoRoutingModule { }
