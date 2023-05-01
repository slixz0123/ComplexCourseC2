import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService {

//   constructor(
//     private tokenService: TokenService,
//     private authService: AuthInterceptorsService
//   ) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     if (!this.tokenService.isLogged()) {
//       return next.handle(req);
//     }

//     let intReq = req;
//     const token = this.tokenService.getToken();

//     intReq = this.addToken(req, token);

//     return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
//       if (err.status === 401) {
//         const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
//         return this.authService.refresh(dto).pipe(concatMap((data: any) => {
//           console.log('refreshing....');
//           this.tokenService.setToken(data.token);
//           intReq = this.addToken(req, data.token);
//           return next.handle(intReq);
//         }));
//       } else if(err.status === 403{
//         this.tokenService.logOut();
//         return throwError(err);
//       } else {
//         return throwError(err);
//       }
//     }));
//   }

//   private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
//     return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
//   }
// }

// export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }];
}


