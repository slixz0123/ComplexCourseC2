import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Horario } from "src/app/Core/models/horario";

@Injectable({
    providedIn: 'root'
  })
export class horarioService{
    
  private URL = "http://localhost:8080/api/Horario/";

  constructor(private http: HttpClient) { }

  crearHorario(horario: Horario){
    return this.http.post<Horario>(this.URL + 'crear', horario);
  }

  listarHorarios(){
    return this.http.get<Horario[]>(this.URL + 'listar')
  }

  listarHorariostrue(){
    return this.http.get<Horario[]>(this.URL + 'listartrue')
  }

  editarHorarios(){
    
  }

  delete(id: number): Observable<any> {
    const url = `${this.URL}eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el horario-curso');
        })
      );
  }
}