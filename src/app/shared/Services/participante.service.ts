
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Curso } from "src/app/Core/models/curso";
import { FichaInscripcion } from "src/app/Core/models/fichaInscripcion";
import { HorarioCurso } from "src/app/Core/models/horarioCurso";
import { Participante } from "src/app/Core/models/participante";
import { Persona } from "src/app/Core/models/persona";

@Injectable({
    providedIn: 'root'
  })

  export class  ParticipanteService{

    private host = "165.22.182.237"
    private URL = "http://"+ this.host +":8080/api/participante";
    private URLReporte = "http://"+ this.host +":8080/api/reporteRegistroParticipantesController"

    constructor(private http: HttpClient) {}

    public crearParticipante(participante: Participante){
        return this.http.post<Participante>(`${this.URL}/crear`, participante);
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

    cursosPersonaparticipante(idpersona: number): Observable<Participante[]> {
      const url = `${this.URL}/participantesPersonaCurso/${idpersona}`;
      return this.http.get<Participante[]>(url);
    }

    public printRegistroParticipantes(curso: Curso, participantes: Participante[], horarios: HorarioCurso[], ficha: FichaInscripcion[]){
      const requestData = {
        curso: curso,
        participantes: participantes,
        horarios: horarios,
        ficha: ficha
      };
      return this.http.post(`${this.URLReporte}/generarReporte`, requestData, {
        responseType: 'blob'
      });
    }

  }
