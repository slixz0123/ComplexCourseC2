import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class DisenoCurricularServService {

   private URL = "http://localhost:8080/api/DisenoCurricular";


   constructor(private http: HttpClient) { }
 
   getAll(): Observable<DisenoCurricular[]> {
    return this.http.get<DisenoCurricular[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<DisenoCurricular> {
    return this.http.get<DisenoCurricular>(`${this.URL}/buscar/${id}`);
  }

  create(data: any): Observable<DisenoCurricular> {
  return this.http.post<DisenoCurricular>(`${this.URL}/crear`, data);
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
          return throwError('Error eliminando el diseño curricular');
        })
      );
  }

  update(diseno: DisenoCurricular, dcuId: any) {
    return this.http.put<DisenoCurricular>(this.URL + `/actualizar/${dcuId}`, diseno);
  }



  getAllTrue(): Observable<DisenoCurricular[]> {
    return this.http.get<DisenoCurricular[]>(`${this.URL}/listartrue`);
  }

  getAllFalse(): Observable<DisenoCurricular[]> {
    return this.http.get<DisenoCurricular[]>(`${this.URL}/listarfalse`);
  }

}



