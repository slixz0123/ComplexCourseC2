import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/Core/models/rol';
import { ProgramaCapacitacion } from 'src/app/Core/models/ProgramaCapacitacion';

@Injectable({
  providedIn: 'root'
})
export class ProgramaCapacitacionServ {

  // private apiUrl = 'http://localhost:8080/api/persona/crear'; // Reemplaza con la URL de tu API
  private URL = "http://localhost:8080/api/programacapacitacion";
  private URLcre = "http://localhost:8080/persona/signup";

  constructor(private http: HttpClient) { }

  public saveProgramacap(programaCapacitacion: ProgramaCapacitacion) {
    return this.http.post<ProgramaCapacitacion>(`${this.URL}/crear`, programaCapacitacion);
  }

  public getAllProgramasC() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getPersonById(id_programac: number) {
    return this.http.get<ProgramaCapacitacion>(URL + '/buscar/' + id_programac);
  }

  public updatepersona(id_programac: any, programaCapacitacion: ProgramaCapacitacion) {
    return this.http.put<ProgramaCapacitacion>(URL + '/actualizar/' + id_programac, programaCapacitacion);
  }


}

