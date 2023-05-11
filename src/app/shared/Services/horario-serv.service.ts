import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { horario } from "src/app/Core/models/horario";

@Injectable({
    providedIn: 'root'
  })
export class horarioService{
    
  private URL = "http://localhost:8080/api/Horario/";

  constructor(private http: HttpClient) { }

  crearHorario(horario: horario){
    return this.http.post<horario>(this.URL + 'crear', horario);
  }

  listarHorarios(){
    return this.http.get<horario[]>(this.URL + 'listar')
  }

  editarHorarios(){
    
  }
}