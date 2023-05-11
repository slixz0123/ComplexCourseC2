import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Core/models/persona';
import { Usuario } from 'src/app/Core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaServService {

    private URL = "http://localhost:8080/api/persona";

    private URLBuscar = "http://localhost:8080/api/persona/buscar/";
    private URLcre = "http://localhost:8080/api/persona/crear";
    private URLced = "http://localhost:8080/api/persona/cedulas/";
    private URLusuario="http://localhost:8080/usuarios/signup";

    constructor(private http: HttpClient) { }
  
    //utiliizados
    postPersona(persona: Persona) {
      return this.http.post<Persona>(this.URLcre + '?', persona);
    }

    public buscarPorCedula(cedula: string): Observable<Persona> {
      return this.http.get<Persona>(this.URLced + cedula);
    }
    createUser(usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(`${this.URLusuario}/signup`, usuario);
  }


// sin utilizar

    getPersonas() {
      return this.http.get<Persona[]>(`${this.URL}listarp`);
    }
  
    getPorId(idPersona: number) {
      return this.http.get<Persona>(this.URLBuscar + idPersona);
    }
  
   
  
    updatePersona(persona: Persona, idPersona: any) {
      return this.http.put<Persona>(this.URL + `/actualizar/${idPersona}`, persona);
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
