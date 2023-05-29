import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaEvaluacion } from 'src/app/Core/models/fichaEvaluacion';

@Injectable({
  providedIn: 'root'
})
export class FichaEvaluacionService {
  private host = "165.22.182.237"
  private URL = "http://" + this.host + ":8080/api/FichaEvaluacion";

  constructor(private http: HttpClient) { }

  obtenerLista(): Observable<FichaEvaluacion[]> {
    return this.http.get<FichaEvaluacion[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<FichaEvaluacion> {
    return this.http.get<FichaEvaluacion>(`${this.URL}/buscar/${id}`);
  }

  crear(fichaEvaluacion: FichaEvaluacion): Observable<FichaEvaluacion> {
    return this.http.post<FichaEvaluacion>(`${this.URL}/crear`, fichaEvaluacion);
  }

  eliminar(id: number, fichaEvaluacion: FichaEvaluacion): Observable<any> {
    return this.http.put<any>(`${this.URL}/eliminar/${id}`, fichaEvaluacion);
  }

  actualizar(id: number, fichaEvaluacion: FichaEvaluacion): Observable<FichaEvaluacion> {
    return this.http.put<FichaEvaluacion>(`${this.URL}/actualizar/${id}`, fichaEvaluacion);
  }
}
