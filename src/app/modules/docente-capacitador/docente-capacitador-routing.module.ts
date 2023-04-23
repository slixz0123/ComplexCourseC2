import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //home de capacitador
  {
    path: '',
    loadChildren: () => import("./bienvenida-capacitador/bienvenida-capacitador.module").then(m => m.BienvenidaCapacitadorModule)
  },
  //necesidad curso
  {
    path: 'register-necesidad',
    loadChildren: () => import("./register-necesidad/register-necesidad.module").then(m => m.RegisterNecesidadModule)
  },
  {
    path: 'edit-list-necesidad',
    loadChildren: () => import("./edit-list-necesidad/edit-list-necesidad.module").then(m => m.EditListNecesidadModule)
  },
  //silabo
  {
    path: 'register-silabo',
    loadChildren: () => import("./register-silabo/register-silabo-routing.module").then(m => m.RegisterSilaboRoutingModule)
  },
  {
    path: 'edit-list-silabo',
    loadChildren: () => import("./edit-list-silabo/edit-list-silabo.module").then(m => m.EditListSilaboModule)
  },
  //diseno curricular
  {
    path: 'register-diseno-curricular',
    loadChildren: () => import("./register-diseno-curricular/register-diseno-curricular.module").then(m => m.RegisterDisenoCurricularModule)
  },
  {
    path: 'edit-list-diseno-curricular',
    loadChildren: () => import("./edit-list-diseno-curricular/edit-list-diseno-curricular.module").then(m => m.EditListDisenoCurricularModule)
  },
  //asistencia
  {
    path: 'register-asistencia',
    loadChildren: () => import("./register-asistencia/register-asistencia-routing.module").then(m => m.RegisterAsistenciaRoutingModule)
  },
  {
    path: 'edit-list-asistencia',
    loadChildren: () => import("./edit-list-asistencia/edit-list-asistencia.module").then(m => m.EditListAsistenciaModule)
  },
  //notas
  {
    path: 'register-notas',
    loadChildren: () => import("./register-notas/register-notas.module").then(m => m.RegisterNotasModule)
  },
  {
    path: 'edit-list-notas',
    loadChildren: () => import("./edit-list-notas/edit-list-notas.module").then(m => m.EditListNotasModule)
  },
   //reportes
   {
    path: 'reportes-capacitador',
    loadChildren: () => import("./reportes/reportes.module").then(m => m.ReportesModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteCapacitadorRoutingModule { }
