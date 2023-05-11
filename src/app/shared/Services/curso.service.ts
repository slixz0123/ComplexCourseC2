import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private URL = "http://localhost:8080/api/Curso/buscar/";
  private URL1 = "http://localhost:8080/api/Curso/";
  private URL2 = "http://localhost:8080/api/Curso/crear";
 

  constructor(private http: HttpClient) { }
  post(cur: Curso) {
    return this.http.post<Curso>(this.URL2 + '?', cur);
  }
  getById(idc: number) {
    return this.http.get<Curso>(this.URL + idc);
  }
  getAll() {
    return this.http.get<Curso[]>(this.URL1 + 'listar')
  }
  delete(cur: Curso, id_cur: number) {
    return this.http.put<Curso>(this.URL1+ `eliminar/${id_cur}`, cur);
  }
  update(cur: Curso, id_cur: number) {
    return this.http.put<Curso>(this.URL1+ `actualizar/${id_cur}`, cur);
  }
}
