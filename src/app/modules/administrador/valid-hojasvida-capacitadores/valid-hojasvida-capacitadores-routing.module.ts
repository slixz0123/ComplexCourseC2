import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidHojasvidaCapacitadoresComponent } from './pages/valid-hojasvida-capacitadores/valid-hojasvida-capacitadores.component';

const routes: Routes = [
  {
    path:'',
    component: ValidHojasvidaCapacitadoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidHojasvidaCapacitadoresRoutingModule { }
