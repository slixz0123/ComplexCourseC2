import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaEvaluacion } from 'src/app/Core/models/fichaEvaluacion';

@Injectable({
  providedIn: 'root'
})
export class FichaEvaluacionService {
  private apiUrl = 'http://localhost:8080/api/FichaEvaluacion';

  constructor(private http: HttpClient) { }

  obtenerLista(): Observable<FichaEvaluacion[]> {
    return this.http.get<FichaEvaluacion[]>(`${this.apiUrl}/listar`);
  }

  getById(id: number): Observable<FichaEvaluacion> {
    return this.http.get<FichaEvaluacion>(`${this.apiUrl}/buscar/${id}`);
  }

  crear(fichaEvaluacion: FichaEvaluacion): Observable<FichaEvaluacion> {
    return this.http.post<FichaEvaluacion>(`${this.apiUrl}/crear`, fichaEvaluacion);
  }

  eliminar(id: number, fichaEvaluacion: FichaEvaluacion): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/eliminar/${id}`, fichaEvaluacion);
  }

  actualizar(id: number, fichaEvaluacion: FichaEvaluacion): Observable<FichaEvaluacion> {
    return this.http.put<FichaEvaluacion>(`${this.apiUrl}/actualizar/${id}`, fichaEvaluacion);
  }
}
