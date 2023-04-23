import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeHomeComponent } from './modules/home/welcome-home/welcome-home.component';
import { WelcomeAdministradorComponent } from './modules/administrador/welcome-administrador/welcome-administrador.component';
import { WelcomeDocenteCapacitadorComponent } from './modules/docente-capacitador/welcome-docente-capacitador/welcome-docente-capacitador.component';
import { WelcomeParticipantesComponent } from './modules/participantes/welcome-participantes/welcome-participantes.component';
import { SuperAdminComponent } from './modules/super-admin/super-admin/super-admin.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeHomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) // se importa un modulo que tiene routing es decir ruta

  },
  {
    path: 'Admin',
    component: WelcomeAdministradorComponent,
    loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule) // se importa un modulo que tiene routing es decir ruta

  },
  {
    path: 'Capacitador',
    component: WelcomeDocenteCapacitadorComponent,
    loadChildren: () => import('./modules/docente-capacitador/docente-capacitador.module').then(m => m.DocenteCapacitadorModule) // se importa un modulo que tiene routing es decir ruta

  },
  {
    path: 'Participante',
    component: WelcomeParticipantesComponent,
    loadChildren: () => import('./modules/participantes/participantes.module').then(m => m.ParticipantesModule) // se importa un modulo que tiene routing es decir ruta

  },
  {
    path: 'Sup-Admin',
    component: SuperAdminComponent,
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule) // se importa un modulo que tiene routing es decir ruta

  },
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
