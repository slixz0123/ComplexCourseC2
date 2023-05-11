import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //home de capacitador
  {
    path: '',
    loadChildren: () => import("./bienvenida-capacitador/bienvenida-capacitador.module").then(m => m.BienvenidaCapacitadorModule)
  },
  {
    path: 'edit-dts',
    loadChildren: () => import("./edit-dts-docentes/edit-dts-docentes.module").then(m => m.EditDtsDocentesModule)
  },
  {
    path: 'profile',
    loadChildren: () => import("./vista-perfil-docente/vista-perfil-docente.module").then(m => m.VistaPerfilDocenteModule)
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
    loadChildren: () => import("./register-silabo/register-silabo.module").then(m => m.RegisterSilaboModule)
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


  // areas 
  {
    path: 'register-area',
    loadChildren: () => import("./register-area/register-area.module").then(m => m.RegisterAreaModule)
  },
  {
    path: 'edit-area',
    loadChildren: () => import("./edit-list-area/edit-list-area.module").then(m => m.EditListAreaModule)
  },
    // especialidades 
    {
      path: 'register-esp',
      loadChildren: () => import("./register-especialidad/register-especialidad.module").then(m => m.RegisterEspecialidadModule)
    },
    {
      path: 'edit-esp',
      loadChildren: () => import("./edit-list-especialidad/edit-list-especialidad.module").then(m => m.EditListEspecialidadModule)
    },
     // dias 
     {
      path: 'register-dias',
      loadChildren: () => import("./register-dias/register-dias.module").then(m => m.RegisterDiasModule)
    },
    {
      path: 'edit-list-dias',
      loadChildren: () => import("./edit-list-dias/edit-list-dias.module").then(m => m.EditListDiasModule)
    },

    //ficha de evaluacion
    {
      path: 'register-fichaEvaluacion',
      loadChildren: () => import("./register-ficha-evaluacion/register-ficha-evaluacion.module").then(m => m.RegisterFichaEvaluacionModule)
    },

     // mecanismo-evaluacion 
  {
    path: 'register-mecanismo-eva',
    loadChildren: () => import("./register-mecanismo-eva/register-mecanismo-eva.module").then(m => m.RegisterMecanismoEvaModule)
  },
  // detalleME 
  {
    path: 'register-detalle-meva',
    loadChildren: () => import("./register-detalle-meva/register-detalle-meva.module").then(m => m.RegisterDetalleMEvaModule)
  },

  // detalleME 
  {
    path: 'edit-list-ficha-evaluacion',
    loadChildren: () => import("./edit-list-ficha-evaluacion/edit-list-ficha-evaluacion.module").then(m => m.EditListFichaEvaluacionModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteCapacitadorRoutingModule { }
