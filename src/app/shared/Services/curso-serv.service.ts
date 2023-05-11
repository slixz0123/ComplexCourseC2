import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/Core/models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoServ {

  // private apiUrl = 'http://localhost:8080/api/persona/crear'; // Reemplaza con la URL de tu API
  private URL = "http://localhost:8080/api/Curso";
//   private URLcre = "http://localhost:8080/persona/signup";

  constructor(private http: HttpClient) { }

  public saveCurso(curso: Curso) {
    return this.http.post<Curso>(`${this.URL}/crear`, curso);
  }

  public getAllCursos() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getCursoById(idCurso: any) {
    console.log("la id es "+idCurso)
    return this.http.get<any>(`${this.URL}/buscar/`+idCurso);
  }

  public updateCurso(idCurso: any, curso: Curso) {
    return this.http.put<Curso>(`${this.URL}/Actualizar/` + idCurso, curso);
  }

  public cursosporDocente(idDocente: any) {
    return this.http.get<any>(`${this.URL}/findByUser/` + idDocente);
  }

  public cursosporPrograma(idPrograma: any) {
    return this.http.get<any>(`${this.URL}/findBycursosprograma/` + idPrograma);
  }

}

