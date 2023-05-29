import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Institucion } from "src/app/Core/models/institucion";

@Injectable({
    providedIn: 'root'
  })
export class institucion{
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/institucion"
  
  constructor(private http: HttpClient) { }

  crear(registro: Institucion): Observable<Institucion> {
    return this.http.post<Institucion>(`${this.URL}/crear`, registro);
  }

  listar(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.URL}/listar`);
  }

  buscar(id: number): Observable<Institucion> {
    return this.http.get<Institucion>(`${this.URL}/buscar/${id}`);
  }

  eliminar(id: number, registro: Institucion): Observable<any> {
    return this.http.put(`${this.URL}/eliminar/${id}`, registro);
  }

  actualizar(id: number, registro: Institucion): Observable<Institucion> {
    return this.http.put<Institucion>(`${this.URL}/actualizar/${id}`, registro);
  }
  
  listarTrue(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.URL}/listartrue`);
  }

  listarFalse(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.URL}/listarfalse`);
  }

}