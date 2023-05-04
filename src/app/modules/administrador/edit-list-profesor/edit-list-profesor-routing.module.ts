import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListProfesorComponent } from './pages/edit-list-profesor/edit-list-profesor.component';

const routes: Routes = [
  {
    path:'',
    component: EditListProfesorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListProfesorRoutingModule { }
