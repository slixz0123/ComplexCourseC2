import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Area } from 'src/app/Core/models/area';
import { Participante } from 'src/app/Core/models/participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteServService {

   // private apiUrl = 'http://localhost:8080/api/persona/crear'; // Reemplaza con la URL de tu API
   private URL = "http://localhost:8080/api/participante";

   constructor(private http: HttpClient) { }
 
   obtenerParticipantesPorCurso(curId: number): Observable<Participante[]> {
    const url = `${this.URL}/listarparticipantes/${curId}`;
    return this.http.get<Participante[]>(url);
  }
 
}

