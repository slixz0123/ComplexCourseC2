import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Core/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolServService {

  
  private URL = "http://localhost:8080/api/rol/buscar/";
  private URL1 = "http://localhost:8080/api/rol/";
  private URL2 = "http://localhost:8080/api/rol/crear";
 

  constructor(private http: HttpClient) { }


// utilizados 
post(rol: Rol) {
  return this.http.post<Rol>(this.URL2 + '?', rol);
}
getById(idRol: number) {
  return this.http.get<Rol>(this.URL + idRol);
}

//sin utilizar
  getAll() {
    return this.http.get<Rol[]>(this.URL1 + 'listar')
  }

 
  delete(idRol: number) {
    return this.http.delete<boolean>(this.URL + `eliminar/${idRol}`)
  }

  getByName(nombre: string) {
    return this.http.get<Rol>(this.URL + `byName/${nombre}`);
  }

  deleterol(rol: Rol, idRol: number) {
    return this.http.put<Rol>(this.URL1+ `eliminar/${idRol}`, rol);
  }

  updaterol(rol: Rol, id_categoria: number) {
    return this.http.put<Rol>(this.URL1+ `actualizar/${id_categoria}`, rol);
  }
}

