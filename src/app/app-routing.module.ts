import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeHomeComponent } from './modules/home/welcome-home/welcome-home.component';
import { WelcomeAdministradorComponent } from './modules/administrador/welcome-administrador/welcome-administrador.component';
import { WelcomeDocenteCapacitadorComponent } from './modules/docente-capacitador/welcome-docente-capacitador/welcome-docente-capacitador.component';
import { WelcomeParticipantesComponent } from './modules/participantes/welcome-participantes/welcome-participantes.component';
import { WelcomeSupAdminComponent } from './modules/super-admin/welcome-sup-admin/welcome-sup-admin.component';
import { VigilanteRoutesGuard } from './Core/guards/vigilante-routes.guard';

import { AdminGuard } from './Core/guards/admin.guard';
import { UsuarioService } from './shared/Services/usuario.service';



const routes: Routes = [
  {
    path: '',
    component: WelcomeHomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) // se importa un modulo que tiene routing es decir ruta

  },
  {
    path: 'Participante',
    component: WelcomeParticipantesComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'ROLE_PARTICIPANTE'
    },
    loadChildren: () => import('./modules/participantes/participantes.module').then(m => m.ParticipantesModule)
  },
  {
    path: 'Admin',
    canActivate: [AdminGuard],
    component: WelcomeAdministradorComponent,
    data: {
      expectedRole: 'ROLE_ADMIN'
    },
    loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule)
  },
  {
    path: 'Sup-Admin',
    canActivate: [AdminGuard],
    component: WelcomeSupAdminComponent,
    data: {
      expectedRole: 'ROLE_SUPADMIN'
    },
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
  {
    path: 'Capacitador',
    component: WelcomeDocenteCapacitadorComponent,
    canActivate: [AdminGuard],
    data: {
      expectedRole: 'ROLE_DOCENTE'
    },
    loadChildren: () => import('./modules/docente-capacitador/docente-capacitador.module').then(m => m.DocenteCapacitadorModule)
  },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private usuarioService: UsuarioService) {
    const userRole = this.usuarioService.obtenerRol();
    console.log('User Role:', userRole);
    this.usuarioService.setRol(userRole);
  }
}






