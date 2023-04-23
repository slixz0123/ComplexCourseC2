import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaInscripcionComponent } from './pages/ficha-inscripcion/ficha-inscripcion.component';

const routes: Routes = [
  {
    path:'',
    component: FichaInscripcionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaInscripcionRoutingModule { }
