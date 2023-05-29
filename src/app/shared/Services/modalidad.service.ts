import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/modalidadcurso/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/modalidadcurso/";


  constructor(private http: HttpClient) { }

  post(modalidad: ModalidadCurso) {
    return this.http.post(`${this.URL1}crear`, modalidad);
  }
  getById(idmodacur: any) {
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
          // console.error(error);
          return throwError('Error eliminando la ModalidadCurso');
        })
      );
  }

  getModalidadCursosTrue(): Observable<ModalidadCurso[]> {
    return this.http.get<ModalidadCurso[]>(`${this.URL1}listartrue`);
  }

}
