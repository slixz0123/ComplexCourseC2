import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datossilabo';

@Injectable({
  providedIn: 'root'
})
export class DatossilaboservService {
  private URL = "http://localhost:8080/api/iDatosSilabo/buscar/";
  private URL1 = "http://localhost:8080/api/iDatosSilabo/";
  private URL2 = "http://localhost:8080/api/iDatosSilabo/crear";
 

  constructor(private http: HttpClient) { }


// utilizados 
post(Datossilabo: Datossilabo) {
  return this.http.post<Datossilabo>(this.URL2 + '?', Datossilabo);
}
getById(Datossilabo: number) {
  return this.http.get<Datossilabo>(this.URL + Datossilabo);
}
getAll() {
  return this.http.get<Datossilabo[]>(this.URL1 + 'listar')
}
delete(dtssilab: Datossilabo, iddts: number) {
  return this.http.put<Datossilabo>(this.URL1+ `eliminar/${iddts}`, dtssilab);
}
update(dtssilab: Datossilabo, iddts: number) {
  return this.http.put<Datossilabo>(this.URL1+ `actualizar/${iddts}`, dtssilab);
}
getPorId(iddtssil: any) {
  return this.http.get<Datossilabo>(this.URL + iddtssil);
}
}
