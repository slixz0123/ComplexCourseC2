import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { entregaCertificado } from 'src/app/Core/models/entregaCertificado';

@Injectable({
    providedIn: 'root'
  })

export class estregaCertificadoService{

    private URL="http://localhost:8080/api/EntregaCertificado";

    constructor(private http: HttpClient) { }

    listarCertificados(){
      return this.http.get<entregaCertificado[]>(this.URL + '/listar')
    }

    delete(id: number): Observable<any> {
      const url = `${this.URL}eliminar/${id}`;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.put(url, {}, httpOptions)
        .pipe(
          catchError((error: any) => {
            console.error(error);
            return throwError('Error eliminando el horario-curso');
          })
        );
    }
}