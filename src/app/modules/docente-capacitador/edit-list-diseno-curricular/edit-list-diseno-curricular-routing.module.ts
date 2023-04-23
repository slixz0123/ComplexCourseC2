import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListDisenoCurricularComponent } from './pages/edit-list-diseno-curricular/edit-list-diseno-curricular.component';

const routes: Routes = [
  {
    path:'',
    component: EditListDisenoCurricularComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListDisenoCurricularRoutingModule { }
