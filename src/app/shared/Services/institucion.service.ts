import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Institucion } from "src/app/Core/models/institucion";

@Injectable({
    providedIn: 'root'
  })
export class institucion{
<<<<<<< Updated upstream
  private apiUrl = 'http://localhost:8080/api/institucion'
=======
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/institucion"
>>>>>>> Stashed changes
  
  constructor(private http: HttpClient) { }

  crear(registro: Institucion): Observable<Institucion> {
    return this.http.post<Institucion>(`${this.apiUrl}/crear`, registro);
  }

  listar(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.apiUrl}/listar`);
  }

  buscar(id: number): Observable<Institucion> {
    return this.http.get<Institucion>(`${this.apiUrl}/buscar/${id}`);
  }



  eliminar(id: number, registro: Institucion): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminar/${id}`, registro);
  }

  actualizar(id: number, registro: Institucion): Observable<Institucion> {
    return this.http.put<Institucion>(`${this.apiUrl}/actualizar/${id}`, registro);
  }
  
  listarTrue(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.apiUrl}/listartrue`);
  }

  listarFalse(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.apiUrl}/listarfalse`);
  }

}