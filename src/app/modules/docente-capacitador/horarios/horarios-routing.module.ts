import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorariosComponent } from './pages/horarios.component';

const routes: Routes = [
  {
    path:'',
    component: HorariosComponent
  }
];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class HorariosRoutingModule { }
