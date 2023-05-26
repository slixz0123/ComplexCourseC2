import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterInstitucionComponent } from './pages/register-institucion.component';

const routes: Routes = [{
  path:'',
  component: RegisterInstitucionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterInstitucionRoutingModule { }
