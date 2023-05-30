import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class HorasaprendizajeservService {
<<<<<<< Updated upstream

  private URL = "http://localhost:8080/api/horasaprendizaje/buscar/";
  private URL1 = "http://localhost:8080/api/horasaprendizaje/";
  private URL2 = "http://localhost:8080/api/horasaprendizaje/crear";
=======
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/horasaprendizaje/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/horasaprendizaje/";
  private URL2 = "http://"+ this.host +":8080/api/horasaprendizaje/crear";
>>>>>>> Stashed changes


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
  return this.http.get<HorasAprendizaje>(this.URL1 + `getBySilaboId/` +dsiId);
}
}
