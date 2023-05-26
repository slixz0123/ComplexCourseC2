import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';

@Injectable({
  providedIn: 'root'
})
export class ContenidocurservService {

  private URL = "http://localhost:8080/api/ContenidoCurso/buscar/";
  private URL1 = "http://localhost:8080/api/ContenidoCurso/";
  private URL2 = "http://localhost:8080/api/ContenidoCurso/crear";
  private URL3 = "http://localhost:8080/api/ContenidoCurso/crear3";


  constructor(private http: HttpClient) { }


// utilizados
public postMany(data: any[]): Observable<any> {
  return this.http.post<any>(this.URL3, data);
}
post(ContenidosCurso: ContenidosCurso) {
  return this.http.post<ContenidosCurso>(this.URL2 + '?', ContenidosCurso);
}
getById(ContenidosCurso: number) {
  return this.http.get<ContenidosCurso>(this.URL + ContenidosCurso);
}
getAll() {
  return this.http.get<ContenidosCurso[]>(this.URL1 + 'listar')
}
delete(conten: ContenidosCurso, idcont: number) {
  return this.http.put<ContenidosCurso>(this.URL1+ `eliminar/${idcont}`, conten);
}
update(conten: ContenidosCurso, idcont: number) {
  return this.http.put<ContenidosCurso>(this.URL1+ `actualizar/${idcont}`, conten);
}
getPorId(idcon: any) {
  return this.http.get<ContenidosCurso>(this.URL + idcon);
}
getBySilaboId(dsiId: number) {
  return this.http.get<ContenidosCurso>(this.URL1 + `getBySilaboId/` + dsiId);
}
}
