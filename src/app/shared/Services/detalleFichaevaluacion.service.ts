import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleFichaevaluacion } from 'src/app/Core/models/detalleFichaevaluacion';

@Injectable({
  providedIn: 'root',
})
export class DetalleFichaevaluacionService {
  private apiUrl = 'http://localhost:8080/api/DetalleFichaevaluacion';

  constructor(private http: HttpClient) {}

  obtenerLista(): Observable<DetalleFichaevaluacion[]> {
    return this.http.get<DetalleFichaevaluacion[]>(`${this.apiUrl}/listar`);
  }

  getById(id: number): Observable<DetalleFichaevaluacion> {
    return this.http.get<DetalleFichaevaluacion>(`${this.apiUrl}/buscar/${id}`);
  }

  crear(detalleFichaevaluacion: DetalleFichaevaluacion): Observable<DetalleFichaevaluacion> {
    return this.http.post<DetalleFichaevaluacion>(`${this.apiUrl}/crear/`, detalleFichaevaluacion);
  }

  eliminar(id: number, detalleFichaevaluacion: DetalleFichaevaluacion): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/eliminar/${id}`, detalleFichaevaluacion);
    }
    
  actualizar(id: number, detalleFichaevaluacion: DetalleFichaevaluacion): Observable<DetalleFichaevaluacion> {
  return this.http.put<DetalleFichaevaluacion>(`${this.apiUrl}/actualizar/${id}`, detalleFichaevaluacion);
  }
}
