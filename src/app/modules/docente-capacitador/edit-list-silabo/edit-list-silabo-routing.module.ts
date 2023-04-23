import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListSilaboComponent } from './pages/edit-list-silabo/edit-list-silabo.component';

const routes: Routes = [
  {
    path:'',
    component: EditListSilaboComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditListSilaboRoutingModule { }
