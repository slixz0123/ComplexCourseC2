import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { Curso } from 'src/app/Core/models/curso';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class DisenoCurricularService {
  private host = "localhost"
  private URL = "http://" + this.host + ":8080/api/DisenoCurricular";
  private URLReporte = "http://" + this.host + ":8080/api/reporteDisenoCurricular";

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
          // console.error(error);
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
  public printDisenoCurricular(curso: Curso, contenidosCursos: ContenidosCurso[],
    estrategiasMetodologicas: EstrategiasMetodologicas[], detallesMecanismo: DetalleMe[],
    horasAprendizaje: HorasAprendizaje[]): Observable<any> {
    const requestData = {
      curso: curso,
      contenidosCursos: contenidosCursos,
      estrategiasMetodologicas: estrategiasMetodologicas,
      detallesMecanismo: detallesMecanismo,
      horasAprendizaje: horasAprendizaje
    };
    return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }

}



