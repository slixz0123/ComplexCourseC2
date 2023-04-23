import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListNotasComponent } from './pages/edit-list-notas/edit-list-notas.component';

const routes: Routes = [
  {
    path:'',
    component: EditListNotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListNotasRoutingModule { }
