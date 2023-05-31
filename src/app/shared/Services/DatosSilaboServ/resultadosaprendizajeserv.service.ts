import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class ResultadosaprendizajeservService {
  private URL = UrlApi+"/api/resultadoaprendizaje/buscar/";
  private URL1 = UrlApi+"/api/resultadoaprendizaje/";
  private URL2 = UrlApi+"/api/resultadoaprendizaje/crear";
  private URL3 = UrlApi+"/api/resultadoaprendizaje/crear3";


  constructor(private http: HttpClient) { }

  public postMany(data: any[]): Observable<any> {
    return this.http.post<any>(this.URL3, data);
  }

// utilizados
post(ResultadosAprendizaje: ResultadosAprendizaje) {
  return this.http.post<ResultadosAprendizaje>(this.URL2 + '?', ResultadosAprendizaje);
}
getById(ResultadosAprendizaje: number) {
  return this.http.get<ResultadosAprendizaje>(this.URL + ResultadosAprendizaje);
}
getAll() {
  return this.http.get<ResultadosAprendizaje[]>(this.URL1 + 'listar')
}


delete(result: ResultadosAprendizaje, id: number) {
  return this.http.put<ResultadosAprendizaje>(this.URL1+ `eliminar/${id}`, result);
}
update(result: ResultadosAprendizaje, id: number) {
  return this.http.put<ResultadosAprendizaje>(this.URL1+ `actualizar/${id}`, result);
}
getPorId(result: any) {
  return this.http.get<ResultadosAprendizaje>(this.URL + result);
}

getBySilabo(dsiId: any) {
  return this.http.get<ResultadosAprendizaje[]>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
