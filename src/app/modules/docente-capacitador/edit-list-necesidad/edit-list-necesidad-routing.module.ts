import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListNecesidadComponent } from './pages/edit-list-necesidad/edit-list-necesidad.component';

const routes: Routes = [
  {
    path:'',
    component: EditListNecesidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListNecesidadRoutingModule { }
