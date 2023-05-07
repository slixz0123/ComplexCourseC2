import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Area } from 'src/app/Core/models/area';
import { Especialidad } from 'src/app/Core/models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadServService {

   private URL = "http://localhost:8080/api/Especialidad";
   private URLAR = "http://localhost:8080/api/Area";


   constructor(private http: HttpClient) { }
 
   getAll(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.URL}/buscar/${id}`);
  }

  create(data: any): Observable<Especialidad> {
  return this.http.post<Especialidad>(`${this.URL}/crear`, data);
}

 
  delete(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el área');
        })
      );
  }

  update(especialidad: Especialidad, EspId: any) {
    return this.http.put<Especialidad>(this.URL + `/actualizar/${EspId}`, especialidad);
  }



  getAllTrue(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.URL}/listartrue`);
  }

  getAllFalse(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.URL}/listarfalse`);
  }

  getAreasTrue(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.URLAR}/listartrue`);
  }
}



