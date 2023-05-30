import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ResultadosaprendizajeservService {
<<<<<<< Updated upstream

  private URL = "http://localhost:8080/api/resultadoaprendizaje/buscar/";
  private URL1 = "http://localhost:8080/api/resultadoaprendizaje/";
  private URL2 = "http://localhost:8080/api/resultadoaprendizaje/crear";
  private URL3 = "http://localhost:8080/api/resultadoaprendizaje/crear3";
=======
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/resultadoaprendizaje/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/resultadoaprendizaje/";
  private URL2 = "http://"+ this.host +":8080/api/resultadoaprendizaje/crear";
  private URL3 = "http://"+ this.host +":8080/api/resultadoaprendizaje/crear3";
>>>>>>> Stashed changes


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
  return this.http.get<ResultadosAprendizaje>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
