import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';

@Injectable({
  providedIn: 'root'
})
export class TipoCursoService {

  private URL = "http://localhost:8080/api/tipocurso/buscar/";
  private URL1 = "http://localhost:8080/api/tipocurso/";
  private URL2 = "http://localhost:8080/api/tipocurso/crear";
 

  constructor(private http: HttpClient) { }
  post(tipcur: TiposCurso) {
    return this.http.post<TiposCurso>(this.URL2 + '?', tipcur);
  }
  getById(idtpc: any) {
    return this.http.get<TiposCurso>(this.URL + idtpc);
  }
  getPorId(tipocur: any) {
    return this.http.get<TiposCurso>(this.URL + tipocur);
  }
  getAll() {
    return this.http.get<TiposCurso[]>(this.URL1 + 'listar')
  }
  delete(id: number): Observable<any> {
    const url = `${this.URL1}eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el tipo curso');
        })
      );
  }
  update(tipcur: TiposCurso, idtpc: number) {
    return this.http.put<TiposCurso>(this.URL1+ `actualizar/${idtpc}`, tipcur);
  }

  public getAllTrue() {
    return this.http.get<TiposCurso[]>(this.URL1+'listartrue');
  }
 
}
