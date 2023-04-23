import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenFinchaInscripcionComponent } from './pages/gen-fincha-inscripcion/gen-fincha-inscripcion.component';

const routes: Routes = [
  {
    path:'',
    component: GenFinchaInscripcionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenFinchaInscripcionRoutingModule { }
