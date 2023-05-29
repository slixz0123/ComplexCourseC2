import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Core/models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/rol/buscar/";

  constructor(private http: HttpClient) { }
  getById(idRol: number) {
    return this.http.get<Rol>(this.URL + idRol);
  }

}

