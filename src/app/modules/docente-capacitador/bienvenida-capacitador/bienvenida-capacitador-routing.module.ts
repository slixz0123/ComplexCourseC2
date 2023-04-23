import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaCapacitadorComponent } from './pages/bienvenida-capacitador/bienvenida-capacitador.component';

const routes: Routes = [
  {
    path:'',
    component: BienvenidaCapacitadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaCapacitadorRoutingModule { }
