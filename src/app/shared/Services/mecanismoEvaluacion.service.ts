import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoEvaluacion';

@Injectable({
  providedIn: 'root'
})
export class MecanismoEvaluacionService {
<<<<<<< Updated upstream

   private URL = "http://localhost:8080/api/mecanismoevaluacion";
=======
  
  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/mecanismoevaluacion";
>>>>>>> Stashed changes

   constructor(private http: HttpClient) { }
 
   getMecanismos() {
     return this.http.get<MecanismoEvaluacion[]>(`${this.URL}/listar`);
   }
 
   getmecanismoPorId(mevId: number) {
     return this.http.get<MecanismoEvaluacion>(this.URL + mevId);
   }
 
   
 
   updateMecanismo(mecanismo: MecanismoEvaluacion, mevId: any) {
     return this.http.put<MecanismoEvaluacion>(this.URL + `/actualizar/${mevId}`, mecanismo);
   }

   deleteMecanismo(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el mecanismo');
        })
      );
  }
 
   saveMecanismo(mecanismo: MecanismoEvaluacion) {
     return this.http.post(`${this.URL}/crear`, mecanismo);
   }

   getMecanismosTrue(): Observable<MecanismoEvaluacion[]> {
    return this.http.get<MecanismoEvaluacion[]>(`${this.URL}/listartrue`);
  }

  getMecanismosFalse(): Observable<MecanismoEvaluacion[]> {
    return this.http.get<MecanismoEvaluacion[]>(`${this.URL}/listarfalse`);
  }
 
}

