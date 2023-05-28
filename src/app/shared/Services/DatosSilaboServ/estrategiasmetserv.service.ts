import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';


@Injectable({
  providedIn: 'root'
})
export class EstrategiasmetservService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/EstrategiaMetodologica/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/EstrategiaMetodologica/";
  private URL2 = "http://"+ this.host +":8080/api/EstrategiaMetodologica/crear";
  private URL3 = "http://"+ this.host +":8080/api/EstrategiaMetodologica/crear3";


  constructor(private http: HttpClient) { }


// utilizados
public postMany(data: any[]): Observable<any> {
  return this.http.post<any>(this.URL3, data);
}
post(EstrategiasMetodologicas: EstrategiasMetodologicas) {
  return this.http.post<EstrategiasMetodologicas>(this.URL2 + '?', EstrategiasMetodologicas);
}
getById(EstrategiasMetodologicas: number) {
  return this.http.get<EstrategiasMetodologicas>(this.URL + EstrategiasMetodologicas);
}
getAll() {
  return this.http.get<EstrategiasMetodologicas[]>(this.URL1 + 'listar')
}
delete(estrate: EstrategiasMetodologicas, idest: number) {
  return this.http.put<EstrategiasMetodologicas>(this.URL1+ `eliminar/${idest}`, estrate);
}
update(estrate: EstrategiasMetodologicas, idest: number) {
  return this.http.put<EstrategiasMetodologicas>(this.URL1+ `actualizar/${idest}`, estrate);
}
getPorId(idestrate: any) {
  return this.http.get<EstrategiasMetodologicas>(this.URL + idestrate);
}
getBySilaboId(dsiId: number) {
  return this.http.get<EstrategiasMetodologicas>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
