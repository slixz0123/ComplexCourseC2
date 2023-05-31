import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class HorasaprendizajeservService {
  private URL = UrlApi+"/api/horasaprendizaje/buscar/";
  private URL1 = UrlApi+"/api/horasaprendizaje/";
  private URL2 = UrlApi+"/api/horasaprendizaje/crear";
  

  constructor(private http: HttpClient) { }


// utilizados
post(HorasAprendizaje: HorasAprendizaje) {
  return this.http.post<HorasAprendizaje>(this.URL2 + '?', HorasAprendizaje);
}

getById(HorasAprendizaje: number) {
  return this.http.get<HorasAprendizaje>(this.URL + HorasAprendizaje);
}
getAll() {
  return this.http.get<HorasAprendizaje[]>(this.URL1 + 'listar')
}
delete(horasap: HorasAprendizaje, idepra: number) {
  return this.http.put<HorasAprendizaje>(this.URL1+ `eliminar/${idepra}`, horasap);
}
update(horasap: HorasAprendizaje, idepra: number) {
  return this.http.put<HorasAprendizaje>(this.URL1+ `actualizar/${idepra}`, horasap);
}
getPorId(horasepr: any) {
  return this.http.get<HorasAprendizaje>(this.URL + horasepr);
}
getBySilabo(dsiId: any) {
  return this.http.get<HorasAprendizaje[]>(this.URL1 + `getBySilaboId/` +dsiId);
}
}
