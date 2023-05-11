import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaInscripcion } from 'src/app/Core/models/ficha Inscripcion';

@Injectable({
  providedIn: 'root'
})
export class FichaIncripcionServ {

  private URL = "http://localhost:8080/api/FichaInscripcion";

  constructor(private http: HttpClient) { }

  public saveFichaIncripcion(fichaInscripcion: FichaInscripcion) {
    return this.http.post<FichaInscripcion>(`${this.URL}/crear`, fichaInscripcion);
  }

  public getAllFichaIncripcion() {
    // return this.http.get<any>(`${this.URL}/listar`);
    return this.http.get<FichaInscripcion[]>(this.URL + '/listar')
  }

  public getFichaIncripcionById(idFichaInscripcio: any) {
    return this.http.get<any>(`${this.URL}/buscar/`+idFichaInscripcio);
  }

  public updateFichaIncripcion(idFichaInscripcio: any, fichaInscripcion: FichaInscripcion) {
    return this.http.put<FichaInscripcion>(`${this.URL}/Actualizar/` + idFichaInscripcio, fichaInscripcion);
  }

}