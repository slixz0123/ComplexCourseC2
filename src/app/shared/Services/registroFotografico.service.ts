import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroFotografico } from 'src/app/Core/models/registrFotografico';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class RegistroFotograficoService {

  private Url = UrlApi+"/api/registrofotografico";
  private URLReporte = UrlApi+"/api/reporteRegistroFotografico";

  constructor(private http: HttpClient) { }

  listar(): Observable<RegistroFotografico[]> {
    return this.http.get<RegistroFotografico[]>(`${this.Url}/listar`);
  }

  buscar(id: number): Observable<RegistroFotografico> {
    return this.http.get<RegistroFotografico>(`${this.Url}/buscar/${id}`);
  }

  crear(registro: RegistroFotografico): Observable<RegistroFotografico> {
    return this.http.post<RegistroFotografico>(`${this.Url}/crear`, registro);
  }

  eliminar(id: number, registro: RegistroFotografico): Observable<any> {
    return this.http.put(`${this.Url}/eliminar/${id}`, registro);
  }

  actualizar(id: number, registro: RegistroFotografico): Observable<RegistroFotografico> {
    return this.http.put<RegistroFotografico>(`${this.Url}/actualizar/${id}`, registro);
  }

  listarPorCurso(curId: any) {
    return this.http.get(`${this.Url}/getByCurId/`+ curId);
  }

  public printRegistroFotografico(registrFotografico: RegistroFotografico[]){
    return this.http.post(`${this.URLReporte}/generarReporte`, registrFotografico, {
      responseType: 'blob'
    });
  }
}
