import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDtsParticipanteComponent } from './pages/edit-dts-participante/edit-dts-participante.component';

const routes: Routes = [
  {path:'',
    component: EditDtsParticipanteComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDtsParticipanteRoutingModule { }
