import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';

@Injectable({
  providedIn: 'root'
})
export class EvaluaepraService {
  private URL = "http://localhost:8080/api/EvaluacionEpra/buscar/";
  private URL1 = "http://localhost:8080/api/EvaluacionEpra/";
  private URL2 = "http://localhost:8080/api/EvaluacionEpra/crear";
  private URL3 = "http://localhost:8080/api/EvaluacionEpra/crear3";
 
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
}
