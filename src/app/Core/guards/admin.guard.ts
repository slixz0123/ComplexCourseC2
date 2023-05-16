import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioServService } from 'src/app/shared/Services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private authService: UsuarioServService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean | UrlTree {
  //     if (this.authService.login() && this.authService.isAdmin()) {
  //       return true;
  //     } else {
  //       return this.router.parseUrl('/unauthorized');
  //     }
  // }
  
}
