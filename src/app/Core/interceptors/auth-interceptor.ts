import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService,private usuarioservice:UsuarioService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.usuarioservice.getToken();
  
    console.log('Token:', idToken);
  
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });
  
      console.log('Headers:', cloned.headers.keys()); // Imprimir las claves de los encabezados
  
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}