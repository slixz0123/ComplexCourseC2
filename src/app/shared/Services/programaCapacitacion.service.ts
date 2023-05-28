import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';

@Injectable({
  providedIn: 'root',
})
export class ProgramaCapacitacionService {
  
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/programacapacitacion";

  constructor(private http: HttpClient) {}

  getProgramasCapacitacion() {
    return this.http.get<ProgramaCapacitacion[]>(this.URL + '/listar')
  }
  getProgramaCapacitacionById(id: number): Observable<ProgramaCapacitacion> {
    return this.http.get<ProgramaCapacitacion>(`${this.URL}/buscar/${id}`);
  }
  getPorId(id: any) {
    return this.http.get<ProgramaCapacitacion>(`${this.URL}/buscar/${id}`);
  }

  createProgramaCapacitacion(programa: ProgramaCapacitacion): Observable<ProgramaCapacitacion> {
    return this.http.post<ProgramaCapacitacion>(`${this.URL}/crear`, programa);
  }

  deleteProgramaCapacitacion(id: number, programa: ProgramaCapacitacion): Observable<any> {
    return this.http.put(`${this.URL}/eliminar/${id}`, programa);
  }

  updateProgramaCapacitacion(id: number, programa: ProgramaCapacitacion): Observable<ProgramaCapacitacion> {
    return this.http.put<ProgramaCapacitacion>(`${this.URL}/actualizar/${id}`, programa);
  }
}
