import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListFichaEvaluacionComponent } from './pages/edit-list-ficha-evaluacion/edit-list-ficha-evaluacion.component';

const routes: Routes = [
  {
    path: '',
    component: EditListFichaEvaluacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditListFichaEvaluacionRoutingModule {}
