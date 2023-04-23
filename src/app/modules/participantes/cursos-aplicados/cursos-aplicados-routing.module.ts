import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAplicadosComponent } from './pages/cursos-aplicados/cursos-aplicados.component';

const routes: Routes = [
  {
    path:'',
    component: CursosAplicadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosAplicadosRoutingModule { }
