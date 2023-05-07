import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiposCurso } from 'src/app/Core/models/tiposcurso';

@Injectable({
  providedIn: 'root'
})
export class TipoCursosService {

  private URL = "http://localhost:8080/api/tipocurso/buscar/";
  private URL1 = "http://localhost:8080/api/tipocurso/";
  private URL2 = "http://localhost:8080/api/tipocurso/crear";
 

  constructor(private http: HttpClient) { }
  post(tipcur: TiposCurso) {
    return this.http.post<TiposCurso>(this.URL2 + '?', tipcur);
  }
  getById(idtpc: number) {
    return this.http.get<TiposCurso>(this.URL + idtpc);
  }
  getPorId(tipocur: any) {
    return this.http.get<TiposCurso>(this.URL + tipocur);
  }
  getAll() {
    return this.http.get<TiposCurso[]>(this.URL1 + 'listar')
  }
  delete(tipcur: TiposCurso, idtpc: number) {
    return this.http.put<TiposCurso>(this.URL1+ `eliminar/${idtpc}`, tipcur);
  }
  update(tipcur: TiposCurso, idtpc: number) {
    return this.http.put<TiposCurso>(this.URL1+ `actualizar/${idtpc}`, tipcur);
  }
 
}
