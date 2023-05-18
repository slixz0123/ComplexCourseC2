import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  private URL = "http://localhost:8080/api/modalidadcurso/buscar/";
  private URL1 = "http://localhost:8080/api/modalidadcurso/";
  private URL2 = "http://localhost:8080/api/modalidadcurso/crear";
 

  constructor(private http: HttpClient) { }
  post(modcur: ModalidadCurso) {
    return this.http.post<ModalidadCurso>(this.URL2 + '?', modcur);
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

  
  delete(modcur: ModalidadCurso, idmodacur: number) {
    return this.http.put<ModalidadCurso>(this.URL1+ `eliminar/${idmodacur}`, modcur);
  }
  update(modcur: ModalidadCurso, idmodacur: number) {
    return this.http.put<ModalidadCurso>(this.URL1+ `actualizar/${idmodacur}`, modcur);
  }

  getAllTrue() {
    return this.http.get<ModalidadCurso[]>(this.URL1 + 'listartrue')
  }

  getAllFalse() {
    return this.http.get<ModalidadCurso[]>(this.URL1 + 'listarfalse')
  }
}
