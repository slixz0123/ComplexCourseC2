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
 

  constructor(private http: HttpClient) { }
  
  post(tipo: TiposCurso) {
    return this.http.post(`${this.URL1}crear`, tipo);
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
  update(horario: TiposCurso, horId: any) {
    return this.http.put<TiposCurso>(this.URL1 + `actualizar/${horId}`, horario);
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
         return throwError('Error eliminando el tipo de curso');
       })
     );
 }

 getTiposCursosTrue(): Observable<TiposCurso[]> {
  return this.http.get<TiposCurso[]>(`${this.URL1}listartrue`);
}

getTiposCursosFalse(): Observable<TiposCurso[]> {
  return this.http.get<TiposCurso[]>(`${this.URL1}listarfalse`);
}
 
}
