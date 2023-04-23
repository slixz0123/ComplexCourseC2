import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidCursosCapComponent } from './pages/valid-cursos-cap/valid-cursos-cap.component';

const routes: Routes = [
  {
    path:'',
    component: ValidCursosCapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidCursosCapRoutingModule { }
