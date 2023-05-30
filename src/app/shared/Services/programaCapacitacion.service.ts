import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';

@Injectable({
  providedIn: 'root',
})
export class ProgramaCapacitacionService {
<<<<<<< Updated upstream
  private apiUrl = 'http://localhost:8080/api/programacapacitacion';
=======
  
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/programacapacitacion";
>>>>>>> Stashed changes

  constructor(private http: HttpClient) {}


  getProgramasCapacitacion() {
    return this.http.get<ProgramaCapacitacion[]>(this.apiUrl + '/listar')
  }
  getProgramaCapacitacionById(id: number): Observable<ProgramaCapacitacion> {
    return this.http.get<ProgramaCapacitacion>(`${this.apiUrl}/buscar/${id}`);
  }
  getPorId(id: any) {
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
