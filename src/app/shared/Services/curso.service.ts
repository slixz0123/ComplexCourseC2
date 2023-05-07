import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from 'src/app/Core/models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private URL = "http://localhost:8080/api/iCurso/buscar/";
  private URL1 = "http://localhost:8080/api/iCurso/";
  private URL2 = "http://localhost:8080/api/iCurso/crear";
 

  constructor(private http: HttpClient) { }
  post(cur: Cursos) {
    return this.http.post<Cursos>(this.URL2 + '?', cur);
  }
  getById(idc: number) {
    return this.http.get<Cursos>(this.URL + idc);
  }
  getAll() {
    return this.http.get<Cursos[]>(this.URL1 + 'listar')
  }
  delete(cur: Cursos, id_cur: number) {
    return this.http.put<Cursos>(this.URL1+ `eliminar/${id_cur}`, cur);
  }
  update(cur: Cursos, id_cur: number) {
    return this.http.put<Cursos>(this.URL1+ `actualizar/${id_cur}`, cur);
  }
}
