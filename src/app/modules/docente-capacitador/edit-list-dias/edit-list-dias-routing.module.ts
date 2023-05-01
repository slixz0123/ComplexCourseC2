import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListDiasComponent } from './pages/edit-list-dias/edit-list-dias.component';

const routes: Routes = [
  {
    path:'',
    component: EditListDiasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListDiasRoutingModule { }
