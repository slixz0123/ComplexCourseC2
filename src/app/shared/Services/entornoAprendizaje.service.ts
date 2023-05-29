import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EntornoAprendizaje } from 'src/app/Core/models/entornoAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class EntornoAprendizajeService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/EntornoAprendizaje";


  constructor(private http: HttpClient) { }

  getAll(): Observable<EntornoAprendizaje[]> {
    return this.http.get<EntornoAprendizaje[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<EntornoAprendizaje> {
    return this.http.get<EntornoAprendizaje>(`${this.URL}/buscar/${id}`);
  }

  create(data: any): Observable<EntornoAprendizaje> {
    return this.http.post<EntornoAprendizaje>(`${this.URL}/crear`, data);
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
          return throwError('Error eliminando el entorno de aprendizaje');
        })
      );
  }

  update(EntornoAprendizaje: EntornoAprendizaje, eapId: any) {
    return this.http.put<EntornoAprendizaje>(this.URL + `/actualizar/${eapId}`, EntornoAprendizaje);
  }



  getAllTrue(): Observable<EntornoAprendizaje[]> {
    return this.http.get<EntornoAprendizaje[]>(`${this.URL}/listartrue`);
  }

  getAllFalse(): Observable<EntornoAprendizaje[]> {
    return this.http.get<EntornoAprendizaje[]>(`${this.URL}/listarfalse`);
  }

}



