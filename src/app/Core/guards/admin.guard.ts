import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

import { UsuarioService } from 'src/app/shared/Services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const expectedRole = route.data['expectedRole']; // Obtener el rol esperado desde los datos de la ruta
    const userRole = localStorage.getItem('rolNombre'); // Obtener el rol actual del usuario del localStorage
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (token && userRole && expectedRole === userRole) {
      return true; // El usuario tiene el token y el rol correcto, permitir el acceso a la ruta
    } else {
      // El usuario no tiene el token o el rol correcto, redirigir a la página de acceso denegado o inicio de sesión
      return this.router.parseUrl('/'); // Cambia '/acceso-denegado' por la ruta que deseas redirigir en caso de acceso denegado
    }
  }
}

