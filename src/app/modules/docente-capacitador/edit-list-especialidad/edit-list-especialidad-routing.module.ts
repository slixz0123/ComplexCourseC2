import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListEspecialidadComponent } from './pages/edit-list-especialidad/edit-list-especialidad.component';

const routes: Routes = [
  {
    path:'',
    component: EditListEspecialidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListEspecialidadRoutingModule { }
