import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { InformeFinal } from 'src/app/Core/models/InformeFinal';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { Participante } from 'src/app/Core/models/participante';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class InformeFinalService {
  private URL = UrlApi+"/api/informefinal";
  private URLReporte = UrlApi+"/api/reporteInformefinal";

  constructor(private http: HttpClient) { }

  public saveInformefinal(informefinal: InformeFinal) {
    return this.http.post<InformeFinal>(`${this.URL}/crear`, informefinal);
  }

  public getAllInformefinal() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getInformefinalById(idInformefinal: any) {
    return this.http.get<InformeFinal>(`${this.URL}/buscar/`, idInformefinal);
  }

  public updateInformefinalCurso(idInformefinal: any, informefinal: InformeFinal) {
    return this.http.put<InformeFinal>(`${this.URL}/actualizar/` + idInformefinal, informefinal);
  }

  public printInformeFinalCurso(informeFinal: InformeFinal, participantes: Participante[],
    horarioCursos: HorarioCurso[], contenidoCursos: ContenidosCurso[]): Observable<any> {
    const requestData = {
      informeFinal: informeFinal,
      participantes: participantes,
      horarioCursos: horarioCursos,
      contenidoCursos: contenidoCursos
    };
    return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }

  public getInformefinalBycurso(idCurso: any) {
    return this.http.get<InformeFinal>(`${this.URL}/informeporcurso/`+ idCurso);
  }
}

