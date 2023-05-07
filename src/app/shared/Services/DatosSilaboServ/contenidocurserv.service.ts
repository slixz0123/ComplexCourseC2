import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';

@Injectable({
  providedIn: 'root'
})
export class ContenidocurservService {

  private URL = "http://localhost:8080/api/iContenidoCurso/buscar/";
  private URL1 = "http://localhost:8080/api/iContenidoCurso/";
  private URL2 = "http://localhost:8080/api/iContenidoCurso/crear";
 

  constructor(private http: HttpClient) { }


// utilizados 
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
}
