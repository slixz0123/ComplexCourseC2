import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from 'src/app/Core/models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private URLi = "http://localhost:8080/api/Curso";
  private URL = "http://localhost:8080/api/Curso/buscar/";
  private URL1 = "http://localhost:8080/api/Curso/";
  private URL2 = "http://localhost:8080/api/Curso/crear";
 

  constructor(private http: HttpClient) { }
  post(cur: Curso) {
    return this.http.post<Curso>(this.URL2 + '', cur);
  }

  crearCurso(data: any): Observable<Curso> {
    return this.http.post<Curso>(`${this.URL1}crear`, data);
  }
  getById(idc: number) {
    return this.http.get<Curso>(this.URL + idc);
  }
  getAll() {
    return this.http.get<Curso[]>(this.URL1 + 'listar')
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
          return throwError('Error eliminando el curso');
        })
      );
  }

  update(cur: Curso, id_cur: number) {
    return this.http.put<Curso>(this.URL1+ `actualizar/${id_cur}`, cur);
  }

  getAllTrue(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.URL1}listartrue`);
  }

  getAllFalse(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.URL1}listarfalse`);
  }

  public cursosporDocente(idDocente: any) {
    return this.http.get<any>(`${this.URLi}/findByUser/` + idDocente);
  }

  public cursosporPrograma(idPrograma: any) {
    return this.http.get<any>(`${this.URLi}/findBycursosprograma/` + idPrograma);
  }
}
