import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Horario } from "src/app/Core/models/horario";

@Injectable({
    providedIn: 'root'
  })
export class horarioService{
  
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/Horario/";

  constructor(private http: HttpClient) { }

  
  crearHorario(area: Horario) {
    return this.http.post(`${this.URL}crear`, area);
  }

  listarHorarios(){
    return this.http.get<Horario[]>(this.URL + 'listar')
  }

  updateHorario(horario: Horario, horId: any) {
    return this.http.put<Horario>(this.URL + `actualizar/${horId}`, horario);
  }

  deletehorario(id: number): Observable<any> {
   const url = `${this.URL}eliminar/${id}`;
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   return this.http.put(url, {}, httpOptions)
     .pipe(
       catchError((error: any) => {
        //  console.error(error);
         return throwError('Error eliminando el horario');
       })
     );
 }

 getHorariosTrue(): Observable<Horario[]> {
  return this.http.get<Horario[]>(`${this.URL}listartrue`);
}

getHorariosFalse(): Observable<Horario[]> {
  return this.http.get<Horario[]>(`${this.URL}listarfalse`);
}
}