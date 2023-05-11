import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Asistencia } from 'src/app/Core/models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaServService {

   private URL = "http://localhost:8080/api/asistencia";

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
 
}

