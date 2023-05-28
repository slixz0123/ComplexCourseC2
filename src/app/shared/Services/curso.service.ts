import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/Curso/buscar/";
  private URLi = "http://"+ this.host +":8080/api/Curso";
  private URL1 = "http://"+ this.host +":8080/api/Curso/";
  private URL2 = "http://"+ this.host +":8080/api/Curso/crear";
  private URLReporte = "http://"+ this.host +":8080/api/reporteMatrizReporteMensual";
  private URLReporte2 = "http://"+ this.host +":8080/api/reporteRegistroGeneralCursosFinalizados";


  constructor(private http: HttpClient) { }
  post(cur: Curso) {
    return this.http.post<Curso>(this.URL2 + '', cur);
  }

  crearCurso(data: any): Observable<Curso> {
    return this.http.post<Curso>(`${this.URL1}crear`, data);
  }
  getById(idc: number) {
    return this.http.get<Curso>(this.URL + idc);
  }
  getAll() {
    return this.http.get<Curso[]>(this.URL1 + 'listar')
  }
  delete(id: number): Observable<any> {
    const url = `${this.URL1}eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el curso');
        })
      );
  }

update(cur: Curso, id_cur: any) {
    return this.http.put<Curso>(this.URLi+ `/actualizar/${id_cur}`, cur);
  }

  getAllTrue(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.URL1}listartrue`);
  }

  getAllFalse(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.URL1}listarfalse`);
  }

  public cursosporDocente(idDocente: any) {
    return this.http.get<any>(`${this.URLi}/findByUser/` + idDocente);
  }

  public cursosporPrograma(idPrograma: any) {
    return this.http.get<any>(`${this.URLi}/findBycursosprograma/` + idPrograma);
  }

  public printMatrizCursos(cursos: Curso[]){
    return this.http.post(`${this.URLReporte}/generarReporte`, cursos, {
      responseType: 'blob'
    });
  }

  public printReporteGeneralCursosFinalizados(listaParticipantes: Participante[] ,curso: Curso[]){
    const requestData = {
      curso: curso,
      participantes: listaParticipantes
    };
    return this.http.post(`${this.URLReporte2}/generarReporte`, requestData, {
      responseType: 'blob'
    });
  }

}
