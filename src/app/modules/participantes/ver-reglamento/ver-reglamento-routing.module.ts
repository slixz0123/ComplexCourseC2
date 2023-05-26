import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerReglamentoComponent } from './pages/ver-reglamento/ver-reglamento.component';

const routes: Routes = [
  {
    path:'',
    component: VerReglamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerReglamentoRoutingModule { }
