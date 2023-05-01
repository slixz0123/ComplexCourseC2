import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDtsDocentesComponent } from './pages/edit-dts-docentes/edit-dts-docentes.component';

const routes: Routes = [
  {
    path:'',
    component: EditDtsDocentesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDtsDocentesRoutingModule { }
