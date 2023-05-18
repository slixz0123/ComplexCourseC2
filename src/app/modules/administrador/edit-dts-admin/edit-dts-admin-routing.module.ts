import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDtsAdminComponent } from './pages/edit-dts-admin/edit-dts-admin.component';

const routes: Routes = [
  {path:'',
    component: EditDtsAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDtsAdminRoutingModule { }
