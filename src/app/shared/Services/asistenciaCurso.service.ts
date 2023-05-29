import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistenciaCurso } from 'src/app/Core/models/asistenciaCurso';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaCursoService {
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/asistenciacurso";

  constructor(private http: HttpClient) { }

  public saveAsistenciaCurso(asistenciaCurso: AsistenciaCurso) {
    return this.http.post<AsistenciaCurso>(`${this.URL}/crear`, asistenciaCurso);
  }

  public getAllAsisteciasCursos() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getCursoById(idAsistenciaCurso: any) {
    return this.http.get<AsistenciaCurso>(`${this.URL}/buscar/`, idAsistenciaCurso);
  }

  public updateCurso(idAsistenciaCurso: any, asistenciaCurso: AsistenciaCurso) {
    return this.http.put<AsistenciaCurso>(`${this.URL}/actualizar/` + idAsistenciaCurso, asistenciaCurso);
  }
  public getasistenciacbycurso(idCurso: any) {
    return this.http.get<AsistenciaCurso>(`${this.URL}/asistenciacursoporcurso/`+ idCurso);
  }

}

