import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Area } from 'src/app/Core/models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

   // private apiUrl = 'http://localhost:8080/api/persona/crear'; // Reemplaza con la URL de tu API
   private URL = "http://localhost:8080/api/Area";

   constructor(private http: HttpClient) { }
 
   getAreas() {
     return this.http.get<Area[]>(`${this.URL}/listar`);
   }
 
   getAreaPorId(areId: number) {
     return this.http.get<Area>(this.URL + areId);
   }
 
   
 
   updateArea(area: Area, areId: any) {
     return this.http.put<Area>(this.URL + `/actualizar/${areId}`, area);
   }

   deleteArea(id: number): Observable<any> {
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
 
   saveArea(area: Area) {
     return this.http.post(`${this.URL}/crear`, area);
   }

   getAreasTrue(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.URL}/listartrue`);
  }

  getAreasFalse(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.URL}/listarfalse`);
  }
 
}

