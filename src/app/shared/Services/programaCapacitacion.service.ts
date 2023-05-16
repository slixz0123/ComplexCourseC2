import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';

@Injectable({
  providedIn: 'root',
})
export class ProgramaCapacitacionService {
  private apiUrl = 'http://localhost:8080/api/programacapacitacion';

  constructor(private http: HttpClient) {}

  getProgramasCapacitacion(): Observable<ProgramaCapacitacion[]> {
    return this.http.get<ProgramaCapacitacion[]>(`${this.apiUrl}/listar`);
  }

  getProgramaCapacitacionById(id: number): Observable<ProgramaCapacitacion> {
    return this.http.get<ProgramaCapacitacion>(`${this.apiUrl}/buscar/${id}`);
  }

  createProgramaCapacitacion(programa: ProgramaCapacitacion): Observable<ProgramaCapacitacion> {
    return this.http.post<ProgramaCapacitacion>(`${this.apiUrl}/crear`, programa);
  }

  deleteProgramaCapacitacion(id: number, programa: ProgramaCapacitacion): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminar/${id}`, programa);
  }

  updateProgramaCapacitacion(id: number, programa: ProgramaCapacitacion): Observable<ProgramaCapacitacion> {
    return this.http.put<ProgramaCapacitacion>(`${this.apiUrl}/actualizar/${id}`, programa);
  }
}
