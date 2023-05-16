import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

  editarHorarios(){
    
  }
}