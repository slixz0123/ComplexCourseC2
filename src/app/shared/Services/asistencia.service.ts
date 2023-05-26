import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private URL = "http://localhost:8080/api/asistencia";
  private URLReporte = "http://localhost:8080/api/reporteRegistroAsistenciaEvaluacion";
  private URLReporte2 = "http://localhost:8080/api/reporteRegistroAsistenciaEvaluacion";

   constructor(private http: HttpClient) { }

   getAsistencias() {
     return this.http.get<Asistencia[]>(`${this.URL}/listar`);
   }

   getAsistenciaPorId(asiId: number) {
     return this.http.get<Asistencia>(this.URL + asiId);
   }



   updateAsistencia(Asistencia: Asistencia, asiId: any) {
     return this.http.put<Asistencia>(this.URL + `/actualizar/${asiId}`, Asistencia);
   }

   deleteAsistencia(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando la asistencia');
        })
      );
  }

   saveAsistencia(Asistencia: Asistencia) {
     return this.http.post(`${this.URL}/crear`, Asistencia);
   }

   obtenerParticipantesPorCurso(curId: number): Observable<Participante[]> {
    const url = `${this.URL}/participantes/${curId}`;
    return this.http.get<Participante[]>(url);
  }

  obtenerAsistenciasPorParticipante(parId: number): Observable<Asistencia[]> {
    const url = `${this.URL}/${parId}`;
    return this.http.get<Asistencia[]>(url);
  }
  public printRegistroAsistenciaEvaluacion(asistencias: Asistencia[], participantes: Participante[]){
    const requestData = {
      participantes: participantes,
      asistencias: asistencias
    };

    return this.http.post(`${this.URLReporte2}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }
}

