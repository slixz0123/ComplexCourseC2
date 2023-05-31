import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class FichaIncripcionService {
  private URL = UrlApi+"/api/FichaInscripcion";
  private URLReporte = UrlApi+"/api/reporteInscripcionParticipante"

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

  public getFichabycursopersona(idCurso: any,idPersona:any) {
    return this.http.get<any>(`${this.URL}/buscarporcursopersona/`+idCurso+`/`+idPersona);
  }

  public updateFichaIncripcion(idFichaInscripcio: any, fichaInscripcion: FichaInscripcion) {
    return this.http.put<FichaInscripcion>(`${this.URL}/actualizar/` + idFichaInscripcio, fichaInscripcion);
  }

  public getfichasbypersona(idPersona: any){
    return this.http.get<any>(`${this.URL}/fichasbypersona/` + idPersona);
  }

  public FichasPorCurso(curId: any): Observable<FichaInscripcion[]> {
    const url = `${this.URL}/fichasbycurso/${curId}`;
    return this.http.get<FichaInscripcion[]>(url);
  }

  // public getFichaIncripcionByCurId(curId: any): Observable<FichaInscripcion> {
  //   return this.http.get<FichaInscripcion>(`${this.URL}/buscarPorCurso/` + curId);
  // }

  public printFichaInscripcion(ficha: FichaInscripcion): Observable<any> {
    return this.http.post(`${this.URLReporte}/generarReporte`, ficha, {
      responseType: 'blob'
    });
  }

}
