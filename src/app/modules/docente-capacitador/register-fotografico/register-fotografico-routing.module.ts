import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistroFotograficoComponent} from './pages/register-fotografico/register-fotografico.component'

const routes: Routes = [
  {
    path:'',
    component: RegistroFotograficoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFotograficoRoutingModule { }
