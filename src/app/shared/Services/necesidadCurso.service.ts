import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';

@Injectable({
  providedIn: 'root'
})
export class NecesidadCursoService {

  private URL = "http://localhost:8080/api/necesidadcurso/buscar/";
  private URL1 = "http://localhost:8080/api/necesidadcurso/";
  private URL2 = "http://localhost:8080/api/necesidadcurso/crear";
  private URLReporte = "http://localhost:8080/api/reporteInformeNecesidadCurso";


  constructor(private http: HttpClient) { }
  post(nece: NecesidadCurso) {
    return this.http.post<NecesidadCurso>(this.URL2 + '?', nece);
  }
  getById(idnc: number) {
    return this.http.get<NecesidadCurso>(this.URL + idnc);
  }
  getAll() {
    return this.http.get<NecesidadCurso[]>(this.URL1 + 'listar')
  }
  delete(nece: NecesidadCurso, id_dia: number) {
    return this.http.put<NecesidadCurso>(this.URL1+ `eliminar/${id_dia}`, nece);
  }
  update(nece: NecesidadCurso, id_dia: number) {
    return this.http.put<NecesidadCurso>(this.URL1+ `actualizar/${id_dia}`, nece);
  }

  getByCursoId(curId: any) {
    return this.http.get<NecesidadCurso>(`${this.URLReporte}/getByCursoId`, curId);
  }

  public printNececidadCurso(curso: Curso){
    return this.http.post(`${this.URLReporte}/generarReporte`, curso, {
      responseType: 'blob'
    });
  }
}
