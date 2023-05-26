import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //perfil
  {
    path: 'edit-dts-admin',
    loadChildren: () => import("./edit-dts-admin/edit-dts-admin.module").then(m => m.EditDtsAdminModule)
  },
  {
    path: 'vista-perfil-admin',
    loadChildren: () => import("./vista-perfil-admin/vista-perfil-admin.module").then(m => m.VistaPerfilAdminModule)
  },
  //hoome 
  {
    path: '',
    loadChildren: () => import("./bienvenida-admin/bienvenida-admin.module").then(m => m.BienvenidaAdminModule)
  },
  //docente 
  {
    path: 'register-doc',
    loadChildren: () => import("./register-profesor/register-profesor.module").then(m => m.RegisterProfesorModule)
  },
  {
    path: 'edit-doc',
    loadChildren: () => import("./edit-list-profesor/edit-list-profesor.module").then(m => m.EditListProfesorModule)
  },
  //reportes
  {
    path: 'register-programs',
    loadChildren: () => import("./register-program-cap/register-program-cap.module").then(m => m.RegisterProgramCapModule)
  },
  {
    path: 'edit-list-programs',
    loadChildren: () => import("./edit-list-curso/edit-list-curso.module").then(m => m.EditListCursoModule)
  },
  {
    path: 'catalog-programs',
    loadChildren: () => import("./catalog-curso/catalog-curso.module").then(m => m.CatalogCursoModule)
  },
  //validar hojas de vide de los docentes capacitadores 
  {
    path: 'valid-hojasvida-doc',
    loadChildren: () => import("./valid-hojasvida-capacitadores/valid-hojasvida-capacitadores.module").then(m => m.ValidHojasvidaCapacitadoresModule)
  },
  //validar cursos
  {
    path: 'valid-cursos-cap',
    loadChildren: () => import("./valid-cursos-cap/valid-cursos-cap.module").then(m => m.ValidCursosCapModule)
  },
  //reporte de cursos 
  {
    path: 'rep-cursos-cap',
    loadChildren: () => import("./reporte-cursos-capcacitacion/reporte-cursos-capcacitacion.module").then(m => m.ReporteCursosCapcacitacionModule)
  },{
    path: 'reg-institucion',
    loadChildren: () => import("./register-institucion/register-institucion.module").then(m => m.RegisterInstitucionModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
