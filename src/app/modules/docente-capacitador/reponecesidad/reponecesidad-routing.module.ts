import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReponecesidadComponent } from './pages/reponecesidad/reponecesidad.component';

const routes: Routes = [
  {
    path:'',
    component: ReponecesidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReponecesidadRoutingModule { }
