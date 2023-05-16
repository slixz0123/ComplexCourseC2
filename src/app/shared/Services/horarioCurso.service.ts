import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';

@Injectable({
  providedIn: 'root'
})
export class HorarioCursoService {

  private URL = "http://localhost:8080/api/HorarioCurso";

  constructor(private http: HttpClient) { }

  public saveHorarioCurso(horarioCurso: HorarioCurso) {
    return this.http.post<HorarioCurso>(`${this.URL}/crear`, horarioCurso);
  }

  public getAllHorarioCurso() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getHorarioCursoById(idHorarioCurso: any) {
    return this.http.get<any>(`${this.URL}/buscar/`+idHorarioCurso);
  }

  public updateHorarioCurso(idCurso: any, horarioCurso: HorarioCurso) {
    return this.http.put<HorarioCurso>(`${this.URL}/Actualizar/` + idCurso, horarioCurso);
  }

  public horariobycurso(idCurso: any) {
    return this.http.get<any>(`${this.URL}/allhorariosbycurso/` + idCurso);
  }

}
