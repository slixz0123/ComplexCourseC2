import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListAdminsComponent } from './pages/edit-list-admins/edit-list-admins.component';

const routes: Routes = [
  {
    path:'',
    component: EditListAdminsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListAdminsRoutingModule { }
