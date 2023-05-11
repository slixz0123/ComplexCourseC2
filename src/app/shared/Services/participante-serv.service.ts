import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Participante } from "src/app/Core/models/participante";

@Injectable({
    providedIn: 'root'
  })

  export class participanteService{
    private URL="http://localhost:8080/api/participante";
    private URLCre="http://localhost:8080/api/participante/crear"

    constructor(private http: HttpClient) { }

    public crearParticipante(participante: Participante){
        return this.http.post<Participante>(this.URLCre, participante);
    }
    public saveFichaIncripcion(participante: Participante) {
      return this.http.post<Participante>(`${this.URL}/crear`, participante);
    }
  }