import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaHomeComponent } from './pages/bienvenida-home/bienvenida-home.component';

const routes: Routes = [
  {
    path:'',
    component: BienvenidaHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaHomeRoutingModule { }
