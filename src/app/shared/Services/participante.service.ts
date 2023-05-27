
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Curso } from "src/app/Core/models/curso";
import { Participante } from "src/app/Core/models/participante";
import { Persona } from "src/app/Core/models/persona";

@Injectable({
    providedIn: 'root'
  })

  export class  ParticipanteService{
    private URL="http://localhost:8080/api/participante";
    private URLCre="http://localhost:8080/api/participante/crear"
    private URLReporte = "http://localhost:8080/api/reporteRegistroParticipantesController"

    constructor(private http: HttpClient) { }

    public crearParticipante(participante: Participante){
        return this.http.post<Participante>(this.URLCre, participante);
    }
    public saveparticipante(participante: Participante) {
      return this.http.post<Participante>(`${this.URL}/crear`, participante);
    }
    obtenerParticipantesPorCurso(curId: number): Observable<Participante[]> {
      const url = `${this.URL}/listarparticipantes/${curId}`;
      return this.http.get<Participante[]>(url);
    }

    ParticipantesPorCurso(curId: number): Observable<Participante[]> {
      const url = `${this.URL}/participantesPorCurso/${curId}`;
      return this.http.get<Participante[]>(url);
    }


    ParticipantesPorhorarioc(curId: number,idHorario:any): Observable<Participante[]> {
      const url = `${this.URL}/participantesPorhorarioc/${curId}/${idHorario}`;
      return this.http.get<Participante[]>(url);
    }

    updateparticipante(idParticipante: any, participante: Participante) {
      return this.http.put<Participante>(`${this.URL}/actualizar/`+ idParticipante, participante);
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

    public printRegistroParticipantes(curso: Curso, participantes: Participante[]){
      const requestData = {
        curso: curso,
        participantes: participantes
      };
      return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
        responseType: 'blob'
      });
    }


  }
