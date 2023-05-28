import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleFichaevaluacion } from 'src/app/Core/models/detalleFichaevaluacion';

@Injectable({
  providedIn: 'root',
})
export class DetalleFichaevaluacionService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/DetalleFichaevaluacion";

  constructor(private http: HttpClient) {}

  obtenerLista(): Observable<DetalleFichaevaluacion[]> {
    return this.http.get<DetalleFichaevaluacion[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<DetalleFichaevaluacion> {
    return this.http.get<DetalleFichaevaluacion>(`${this.URL}/buscar/${id}`);
  }

  crear(detalleFichaevaluacion: DetalleFichaevaluacion): Observable<DetalleFichaevaluacion> {
    return this.http.post<DetalleFichaevaluacion>(`${this.URL}/crear/`, detalleFichaevaluacion);
  }

  eliminar(id: number, detalleFichaevaluacion: DetalleFichaevaluacion): Observable<any> {
    return this.http.put<any>(`${this.URL}/eliminar/${id}`, detalleFichaevaluacion);
    }
    
  actualizar(id: number, detalleFichaevaluacion: DetalleFichaevaluacion): Observable<DetalleFichaevaluacion> {
  return this.http.put<DetalleFichaevaluacion>(`${this.URL}/actualizar/${id}`, detalleFichaevaluacion);
  }
}
