import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Core/models/rol';
import { Observable } from 'rxjs';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private URL = UrlApi+"/api/rol/buscar/";

  constructor(private http: HttpClient) { }
  getById(idRol: number) {
    return this.http.get<Rol>(this.URL + idRol);
  }

}

