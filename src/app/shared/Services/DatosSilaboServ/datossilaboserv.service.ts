import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';

@Injectable({
  providedIn: 'root'
})
export class DatossilaboservService {
  private URL = "http://localhost:8080/api/DatosSilabo/buscar/";
  private URL1 = "http://localhost:8080/api/DatosSilabo/";
  private URL2 = "http://localhost:8080/api/DatosSilabo/crear";
  private items: ResultadosAprendizaje[] = [];

  constructor(private http: HttpClient) { }


// utilizados 
getItems(): ResultadosAprendizaje[] {
  return this.items;
}
addItem(product: ResultadosAprendizaje, ): void {
  this.items.push(product);
}

removeItem(product: ResultadosAprendizaje): void {
  const index = this.items.indexOf(product);
  if (index !== -1) {
    this.items.splice(index, 1);
  }
}
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