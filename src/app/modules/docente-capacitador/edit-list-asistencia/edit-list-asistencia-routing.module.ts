import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListAsistenciaComponent } from './pages/edit-list-asistencia/edit-list-asistencia.component';

const routes: Routes = [
  {
    path:'',
    component: EditListAsistenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListAsistenciaRoutingModule { }
