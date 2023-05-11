import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAreaComponent } from './pages/register-area/register-area.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterAreaComponent
  }
];

@NgModule({
  imports: [FormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAreaRoutingModule { }
