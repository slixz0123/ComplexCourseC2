import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class EvaluaepraService {
  private URL = UrlApi+"/api/EvaluacionEpra/buscar/";
  private URL1 = UrlApi+"/api/EvaluacionEpra/";
  private URL2 = UrlApi+"/api/EvaluacionEpra/crear";
  private URL3 = UrlApi+"/api/EvaluacionEpra/crear3";

  private items: EvaluacionEpra[] = [];
  constructor(private http: HttpClient) { }


// utilizados
public postMany(data: any[]): Observable<any> {
  return this.http.post<any>(this.URL3, data);
}
post(EvaluacionEpra: EvaluacionEpra) {
  return this.http.post<EvaluacionEpra>(this.URL2 + '?', EvaluacionEpra);
}
getById(EvaluacionEpra: number) {
  return this.http.get<EvaluacionEpra>(this.URL + EvaluacionEpra);
}
getAll() {
  return this.http.get<EvaluacionEpra[]>(this.URL1 + 'listar')
}
delete(evaepra: EvaluacionEpra, idepra: number) {
  return this.http.put<EvaluacionEpra>(this.URL1+ `eliminar/${idepra}`, evaepra);
}
update(evaepra: EvaluacionEpra, idepra: number) {
  return this.http.put<EvaluacionEpra>(this.URL1+ `actualizar/${idepra}`, evaepra);
}
getPorId(idevaepra: any) {
  return this.http.get<EvaluacionEpra>(this.URL + idevaepra);
}
getItems(): EvaluacionEpra[] {
  return this.items;
}
getBySilaboId(dsiId: number) {
  return this.http.get<EvaluacionEpra[]>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
