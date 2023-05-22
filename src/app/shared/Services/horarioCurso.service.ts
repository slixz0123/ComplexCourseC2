import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';

@Injectable({
  providedIn: 'root'
})
export class HorarioCursoService {

  private URL = "http://localhost:8080/api/HorarioCurso";

  constructor(private http: HttpClient) { }

  public getAllHorarioCurso() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getHorarioCursoById(idHorarioCurso: any) {
    return this.http.get<any>(`${this.URL}/buscar/`+idHorarioCurso);
  }

  public horariobycurso(idCurso: any) {
    return this.http.get<any>(`${this.URL}/allhorariosbycurso/` + idCurso);
  }

  create(data: any): Observable<HorarioCurso> {
    return this.http.post<HorarioCurso>(`${this.URL}/crear`, data);
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
          return throwError('Error eliminando el HorarioCurso');
        })
      );
  }

  update(HorarioCurso: HorarioCurso, EspId: any) {
    return this.http.put<HorarioCurso>(this.URL + `/actualizar/${EspId}`, HorarioCurso);
  }

  getAllTrue(): Observable<HorarioCurso[]> {
    return this.http.get<HorarioCurso[]>(`${this.URL}/listartrue`);
  }

  getAllFalse(): Observable<HorarioCurso[]> {
    return this.http.get<HorarioCurso[]>(`${this.URL}/listarfalse`);
  }

}
