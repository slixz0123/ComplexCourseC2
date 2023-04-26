import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Core/models/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaServService {

    private URL = "http://localhost:8080/api/persona";
    private URLcre = "http://localhost:8080/api/persona/crear";

    constructor(private http: HttpClient) { }
  
    //utiliizados
    postPersona(persona: Persona) {
      return this.http.post<Persona>(this.URLcre + '?', persona);
    }


// sin utilizar

    getPersonas() {
      return this.http.get<Persona[]>(`${this.URL}listarp`);
    }
  
    getPorId(idPersona: number) {
      return this.http.get<Persona>(this.URL + idPersona);
    }
  
   
  
    updatePersona(persona: Persona, idPersona: any) {
      return this.http.put<Persona>(this.URL + `actualizar/${idPersona}`, persona);
    }
  
    deletePersona(idPersona: number) {
      return this.http.delete<boolean>(this.URL + `eliminar/${idPersona}`);
    }
  
    save(persona: Persona) {
      return this.http.post(`${this.URL}/`, persona);
    }
  
    listarPersona(): Observable<any> {
      return this.http.get(`${this.URL}listaper`);
    }
  
    getPorCedula(id_persona: any) {
      return this.http.get<Persona>(this.URL + `buscarpersona/${id_persona}`);
    }
    // getPersonasConUsuarios(): Observable<PersonaI[]> {
    //   return this.http.get<any>(`${this.URL}/listar?_expand=listaruser`)
    //     .pipe(
    //       map(data => data.map((item: any) => ({
    //         id: item.id_persona,
    //         cedula: item.cedula,
    //         nombre: item.nombre,
    //         apellido:item.apellido,
    //         correo: item.correo,
    //         telefono:item.telefono,
    //         usuario: item.usuario
    //       })))
    //     );
    // }
  

}
