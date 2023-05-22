import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  private URL = "http://localhost:8080/api/modalidadcurso/buscar/";
  private URL1 = "http://localhost:8080/api/modalidadcurso/";
  private URL2 = "http://localhost:8080/api/modalidadcurso/crear";
 

  constructor(private http: HttpClient) { }
  
  post(modalidad: ModalidadCurso) {
    return this.http.post(`${this.URL1}crear`, modalidad);
  }
  getById(idmodacur: any) {
    return this.http.get<ModalidadCurso>(this.URL + idmodacur);
  }
  getPorId(idmodacur: any) {
    return this.http.get<ModalidadCurso>(this.URL + idmodacur);
  }
  getAll() {
    return this.http.get<ModalidadCurso[]>(this.URL1 + 'listar')
  }
  
  update(ModalidadCurso: ModalidadCurso, horId: any) {
    return this.http.put<ModalidadCurso>(this.URL1 + `actualizar/${horId}`, ModalidadCurso);
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
         return throwError('Error eliminando la ModalidadCurso');
       })
     );
 }

 getModalidadCursosTrue(): Observable<ModalidadCurso[]> {
  return this.http.get<ModalidadCurso[]>(`${this.URL1}listartrue`);
}

getModalidadCursosFalse(): Observable<ModalidadCurso[]> {
  return this.http.get<ModalidadCurso[]>(`${this.URL1}listarfalse`);
}
}
