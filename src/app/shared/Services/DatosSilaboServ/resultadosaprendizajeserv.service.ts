import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/ResultadosAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ResultadosaprendizajeservService {

  private URL = "http://localhost:8080/api/resultadoaprendizaje/buscar/";
  private URL1 = "http://localhost:8080/api/resultadoaprendizaje/";
  private URL2 = "http://localhost:8080/api/resultadoaprendizaje/crear";
 

  constructor(private http: HttpClient) { }


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
}
