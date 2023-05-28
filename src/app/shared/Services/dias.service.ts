import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dias } from 'src/app/Core/models/dias';

@Injectable({
  providedIn: 'root'
})
export class DiasService {
  private host = "localhost"
  private URL = "http://" + this.host + ":8080/api/Dia/buscar/";
  private URL1 = "http://" + this.host + ":8080/api/Dia/";
  private URL2 = "http://" + this.host + ":8080/api/Dia/crear";


  constructor(private http: HttpClient) { }

  // utilizados 
  post(dias: Dias) {
    return this.http.post<Dias>(this.URL2 + '?', dias);
  }
  getById(dias: number) {
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
