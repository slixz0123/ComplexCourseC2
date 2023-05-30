import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';

@Injectable({
  providedIn: 'root'
})
export class NecesidadCursoService {

  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/necesidadcurso";
  private URLReporte = "http://"+ this.host +":8080/api/reporteInformeNecesidadCurso";


  constructor(private http: HttpClient) { }
  post(nece: NecesidadCurso) {
    return this.http.post<NecesidadCurso>(this.URL + '/crear?', nece);
  }
  getById(idnc: number) {
    return this.http.get<NecesidadCurso>(this.URL + `/buscar/${idnc}`);
  }
  getAll() {
    return this.http.get<NecesidadCurso[]>(this.URL + '/listar')
  }
  delete(nece: NecesidadCurso, id_dia: number) {
    return this.http.put<NecesidadCurso>(this.URL+ `/eliminar/${id_dia}`, nece);
  }
  update(nece: NecesidadCurso, id_dia: number) {
    return this.http.put<NecesidadCurso>(this.URL+ `/actualizar/${id_dia}`, nece);
  }
  public printNececidadCurso(curso: Curso, horarioCursos: HorarioCurso[]){
    const requestData = {
      curso: curso,
      horarioCursos: horarioCursos
    }

    return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }
}
