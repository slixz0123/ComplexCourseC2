import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptarCursoComponent } from './pages/aceptar-curso.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AceptarCursoComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AceptarCursoRoutingModule { }
