import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformeFinal } from 'src/app/Core/models/InformeFinal';
import { Participante } from 'src/app/Core/models/participante';

@Injectable({
  providedIn: 'root'
})
export class InformeFinalService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/informefinal";
  private URLReporte = "http://"+ this.host +":8080/api/reporteInformefinal";

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

  public printInformeFinalCurso(informeFinal: InformeFinal, participantes: Participante[]): Observable<any> {
    const requestData = {
      informeFinal: informeFinal,
      participantes: participantes
    };
    return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }
  
  public getInformefinalBycurso(idCurso: any) {
    return this.http.get<InformeFinal>(`${this.URL}/informeporcurso/`+ idCurso);
  }
}

