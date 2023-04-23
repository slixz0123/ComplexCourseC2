import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiserDisenoCurricularComponent } from './pages/regiser-diseno-curricular/regiser-diseno-curricular.component';

const routes: Routes = [
  {
    path:'',
    component: RegiserDisenoCurricularComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterDisenoCurricularRoutingModule { }
