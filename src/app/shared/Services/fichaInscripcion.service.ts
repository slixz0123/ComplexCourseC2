import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';

@Injectable({
  providedIn: 'root'
})
export class FichaIncripcionService {

  private URL = "http://localhost:8080/api/FichaInscripcion";

  private URLFicha="http://localhost:8080/api/reporteInscripcionParticipante"

  constructor(private http: HttpClient) { }

  public saveFichaIncripcion(fichaInscripcion: FichaInscripcion) {
    return this.http.post<FichaInscripcion>(`${this.URL}/crear`, fichaInscripcion);
  }

  public getAllFichaIncripcion() {
    return this.http.get<FichaInscripcion[]>(this.URL + '/listar')
  }

  public getFichaIncripcionById(idFichaInscripcio: any) {
    return this.http.get<any>(`${this.URL}/buscar/`+idFichaInscripcio);
  }

  public updateFichaIncripcion(idFichaInscripcio: any, fichaInscripcion: FichaInscripcion) {
    return this.http.put<FichaInscripcion>(`${this.URL}/actualizar/` + idFichaInscripcio, fichaInscripcion);
  }

<<<<<<< Updated upstream
  public getfichasbypersona(idPersona: any){
    return this.http.get<any>(`${this.URL}/fichasbypersona/` + idPersona);
  }

  public FichasPorCurso(curId: any): Observable<FichaInscripcion[]> {
    const url = `${this.URL}/fichasbycurso/${curId}`;
    return this.http.get<FichaInscripcion[]>(url);
  }
}
=======
  public printFichaInscripcion(ficha: FichaInscripcion): Observable<any> {
    return this.http.post(`${this.URLFicha}/generarReporte`, ficha, {
      responseType: 'blob'
    });
  }

  public getFichaIncripcionByCurId(curId: any): Observable<FichaInscripcion> {
    return this.http.get<FichaInscripcion>(`${this.URL}/buscarPorCurso/` + curId);
  }
}
>>>>>>> Stashed changes
