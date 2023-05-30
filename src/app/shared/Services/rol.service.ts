import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Core/models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

<<<<<<< Updated upstream
  
  private URL = "http://localhost:8080/api/rol/buscar/";
  private URL1 = "http://localhost:8080/api/rol/";
  private URL2 = "http://localhost:8080/api/rol/crear";
  private URL3= "http://localhost:8080/api/rol/buscarNombre/{nombre}";
 
=======
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/rol/buscar/";
>>>>>>> Stashed changes

  constructor(private http: HttpClient) { }


  create(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.URL2}/crear`, rol);
  }

  getByRolNombre(rolNombre: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.URL2}/buscar?nombre=${rolNombre}`);
  }

  buscarNombre(rol:String): Observable<Rol>{
    return this.http.get<Rol>(this.URL3 + rol);
  }

// utilizados 
post(rol: Rol) {
  return this.http.post<Rol>(this.URL2 + '', rol);
}
getById(idRol: number) {
  return this.http.get<Rol>(this.URL + idRol);
}



//sin utilizar
  getAll() {
    return this.http.get<Rol[]>(this.URL1 + 'listar')
  }

 
  deleteRol(idRol: number) {
    return this.http.delete<boolean>(this.URL1 + `eliminar/${idRol}`)
  }

  getByName(nombre: string) {
    return this.http.get<Rol>(this.URL + `byName/${nombre}`);
  }

  deleterol(idRol: number, rol: Rol) {
    return this.http.put<boolean>(this.URL1 + `eliminar/${idRol}`, rol);
  }

  updaterol(rol: Rol, id_categoria: number) {
    return this.http.put<Rol>(this.URL1+ `actualizar/${id_categoria}`, rol);
  }
}

