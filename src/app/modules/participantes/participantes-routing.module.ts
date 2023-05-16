import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    //reportes
    {
      path: '',
      loadChildren: () => import("./bienvenida-participantes/bienvenida-participantes.module").then(m => m.BienvenidaParticipantesModule)
    },
    //
    {
      path: 'Eva-Curso',
      loadChildren: () => import("./evaluacion-curso/evaluacion-curso.module").then(m => m.EvaluacionCursoModule)
    },
    // Ficha de inscripcion
  
   {
    path: 'ficha-inscripcion',
    loadChildren: () => import("./ficha-inscripcion/ficha-inscripcion.module").then(m => m.FichaInscripcionModule)
  },
  {
    path: 'gen-ficha-inscripcion',
    loadChildren: () => import("./gen-fincha-inscripcion/gen-fincha-inscripcion.module").then(m => m.GenFinchaInscripcionModule)
  },
  // ver programas de capcaitcacion y aplicar 
  
  {
    path: 'programas-capacitacion',
    loadChildren: () => import("./visualizar-programas--capacitacion/visualizar-programas--capacitacion.module").then(m => m.VisualizarProgramasCapacitacionModule)
  },
  {
    path: 'apli-program-capacitacion',
    loadChildren: () => import("./apli-cursos/apli-cursos.module").then(m => m.ApliCursosModule)
  },
  // ver cusrspos aplicados
  
  {
    path: 'cursos-aplicados',
    loadChildren: () => import("./cursos-aplicados/cursos-aplicados.module").then(m => m.CursosAplicadosModule)
  },
// REPORTE CURSOS-APROBADOS 
{
  path: 'certif-curso-aprovee',
  loadChildren: () => import("./reporte-certificado-curso-aprobados/reporte-certificado-curso-aprobados.module").then(m => m.ReporteCertificadoCursoAprobadosModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantesRoutingModule { }
