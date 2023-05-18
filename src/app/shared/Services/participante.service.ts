
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Participante } from "src/app/Core/models/participante";

@Injectable({
    providedIn: 'root'
  })

  export class  ParticipanteService{
    private URL="http://localhost:8080/api/participante";
    private URLCre="http://localhost:8080/api/participante/crear"

    constructor(private http: HttpClient) { }

    public crearParticipante(participante: Participante){
        return this.http.post<Participante>(this.URLCre, participante);
    }

    create(data: any): Observable<Participante> {
      return this.http.post<Participante>(`${this.URL}/crear`, data);
    }
  
    public saveFichaIncripcion(participante: Participante) {
      return this.http.post<Participante>(`${this.URL}/crear`, participante);
    }
    obtenerParticipantesPorCurso(curId: number): Observable<Participante[]> {
      const url = `${this.URL}/listarparticipantes/${curId}`;
      return this.http.get<Participante[]>(url);
    }

    obtenerParticipantes(idpersona: number): Observable<Participante[]> {
      const url = `${this.URL}/listar/${idpersona}`;
      return this.http.get<Participante[]>(url);
    }

    cursosPersonaparticipante(idpersona: number): Observable<Participante[]> {
      const url = `${this.URL}/participantesPersonaCurso/${idpersona}`;
      return this.http.get<Participante[]>(url);
    }

    obtenerAprobados(){
      return this.http.get<any>(`${this.URL}/listarAprobados`);
    }
  }
