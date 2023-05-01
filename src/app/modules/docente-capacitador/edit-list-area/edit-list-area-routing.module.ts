import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListAreaComponent } from './pages/edit-list-area/edit-list-area.component';

const routes: Routes = [
  {
    path:'',
    component: EditListAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListAreaRoutingModule { }
