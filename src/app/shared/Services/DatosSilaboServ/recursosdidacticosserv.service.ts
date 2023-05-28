import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosDidacticos';

@Injectable({
  providedIn: 'root'
})
export class RecursosdidacticosservService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/recursodidactico/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/recursodidactico/";
  private URL2 = "http://"+ this.host +":8080/api/recursodidactico/crear";


  constructor(private http: HttpClient) { }


// utilizados
post(RecursosDidacticos: RecursosDidacticos) {
  return this.http.post<RecursosDidacticos>(this.URL2 + '?', RecursosDidacticos);
}
getById(RecursosDidacticos: number) {
  return this.http.get<RecursosDidacticos>(this.URL + RecursosDidacticos);
}
getAll() {
  return this.http.get<RecursosDidacticos[]>(this.URL1 + 'listar')
}
delete(recurdi: RecursosDidacticos, id: number) {
  return this.http.put<RecursosDidacticos>(this.URL1+ `eliminar/${id}`, recurdi);
}
update(recurdi: RecursosDidacticos, id: number) {
  return this.http.put<RecursosDidacticos>(this.URL1+ `actualizar/${id}`, recurdi);
}
getPorId(recurdi: any) {
  return this.http.get<RecursosDidacticos>(this.URL + recurdi);
}
getBySilaboId(dsiId: any) {
  return this.http.get<RecursosDidacticos[]>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
