import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dias } from 'src/app/Core/models/dias';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class DiasService {
  private URL = UrlApi+"/api/Dia/buscar/";
  private URL1 = UrlApi+"/api/Dia/";
  private URL2 = UrlApi+"/api/Dia/crear";


  constructor(private http: HttpClient) { }

  // utilizados 
  post(dias: Dias) {
    return this.http.post<Dias>(this.URL2 + '?', dias);
  }
  getById(dias: any) {
    return this.http.get<Dias>(this.URL + dias);
  }
  getAll() {
    return this.http.get<Dias[]>(this.URL1 + 'listar')
  }
  delete(dia: Dias, id_dia: number) {
    return this.http.put<Dias>(this.URL1 + `eliminar/${id_dia}`, dia);
  }
  update(dia: Dias, id_dia: number) {
    return this.http.put<Dias>(this.URL1 + `actualizar/${id_dia}`, dia);
  }
  getPorId(iddias: any) {
    return this.http.get<Dias>(this.URL + iddias);
  }

}
