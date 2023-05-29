import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoEvaluacion';

@Injectable({
  providedIn: 'root'
})
export class DetalleMevaService {
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/DetalleMe";


   constructor(private http: HttpClient) { }

   getAll(): Observable<DetalleMe[]> {
    return this.http.get<DetalleMe[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<DetalleMe> {
    return this.http.get<DetalleMe>(`${this.URL}/buscar/${id}`);
  }

  create(data: any): Observable<DetalleMe> {
  return this.http.post<DetalleMe>(`${this.URL}/crear`, data);
}


  delete(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          // console.error(error);
          return throwError('Error eliminando el detalle');
        })
      );
  }

  update(detalleME: DetalleMe, dmeId: any) {
    return this.http.put<DetalleMe>(this.URL + `/actualizar/${dmeId}`, detalleME);
  }



  getAllTrue(): Observable<DetalleMe[]> {
    return this.http.get<DetalleMe[]>(`${this.URL}/listartrue`);
  }

  getAllFalse(): Observable<DetalleMe[]> {
    return this.http.get<DetalleMe[]>(`${this.URL}/listarfalse`);
  }

}



