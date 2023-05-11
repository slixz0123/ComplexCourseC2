import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modalidadcurso } from 'src/app/Core/models/modalidadcurso';

@Injectable({
  providedIn: 'root'
})
export class ModalidadsercService {

  private URL = "http://localhost:8080/api/modalidadcurso/buscar/";
  private URL1 = "http://localhost:8080/api/modalidadcurso/";
  private URL2 = "http://localhost:8080/api/modalidadcurso/crear";
 

  constructor(private http: HttpClient) { }
  post(modcur: Modalidadcurso) {
    return this.http.post<Modalidadcurso>(this.URL2 + '?', modcur);
  }
  getById(idmodacur: number) {
    return this.http.get<Modalidadcurso>(this.URL + idmodacur);
  }
  getPorId(idmodacur: any) {
    return this.http.get<Modalidadcurso>(this.URL + idmodacur);
  }
  getAll() {
    return this.http.get<Modalidadcurso[]>(this.URL1 + 'listar')
  }
  delete(modcur: Modalidadcurso, idmodacur: number) {
    return this.http.put<Modalidadcurso>(this.URL1+ `eliminar/${idmodacur}`, modcur);
  }
  update(modcur: Modalidadcurso, idmodacur: number) {
    return this.http.put<Modalidadcurso>(this.URL1+ `actualizar/${idmodacur}`, modcur);
  }
}
