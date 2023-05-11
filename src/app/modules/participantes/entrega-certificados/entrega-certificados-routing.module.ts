import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregaCertificadosComponent } from './pages/entrega-certificados.component';

const routes: Routes = [
  {path:'',
    component: EntregaCertificadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregaCertificadosRoutingModule { }
