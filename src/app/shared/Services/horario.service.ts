import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Horario } from "src/app/Core/models/horario";

@Injectable({
    providedIn: 'root'
  })
export class horarioService{
<<<<<<< Updated upstream
    
  private URL = "http://localhost:8080/api/Horario/";
=======
  
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/Horario/";
>>>>>>> Stashed changes

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
         console.error(error);
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