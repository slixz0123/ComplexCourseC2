import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Core/models/persona';
import { Usuario } from 'src/app/Core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaServService {
    // buscarPersona(id_persona: number) {
    //   throw new Error('Method not implemented.');
    // }


    private URL = "http://localhost:8080/api/persona/";
    private URLcre = "http://localhost:8080/api/persona/crear";
    private URLced = "http://localhost:8080/api/persona/cedulas/";
    private URLusuario="http://localhost:8080/usuarios/signup";

    private readonly apiUrl = 'http://localhost:8080/api/persona';


    constructor(private http: HttpClient) { }
  
    //utiliizados
    postPersona(persona: Persona) {
      return this.http.post<Persona>(this.URLcre + '', persona);
    }


    public buscarPorCedula(cedula: string): Observable<Persona> {
      return this.http.get<Persona>(this.URLced + cedula);
    }

    create(persona: Persona): Observable<Persona> {
      return this.http.post<Persona>(`${this.apiUrl}/crear`, persona);

    }


    public buscarPorCedula(cedula: string): Observable<Persona> {
      return this.http.get<Persona>(this.URLced + cedula);
    }
    createUser(usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(`${this.URLusuario}/signup`, usuario);
  }



      listarPersonas(){
        return this.http.get<Persona[]>(this.URL+'listar');
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

    deletepersona(idPersona: number, persona: Persona) {
      return this.http.put<boolean>(this.URL + `eliminar/${idPersona}`, persona);
    }
  
    save(persona: Persona) {
      return this.http.post(`${this.URL}/`, persona);
    }
  
    listarPersona(): Observable<any> {
      return this.http.get(`${this.URL}listaper`);
    }
  
    getPorCedula(id_persona: any) {
      return this.http.get<Persona>(this.URL + `buscar/${id_persona}`);
    }
    
    buscarPersona(cedula: string): Observable<Persona> {
      const url = `${this.URL}/${cedula}`;
      return this.http.get<Persona>(url);
    }

    // buscarPersona(idPersona: number): Observable<Persona> {
    //   const urlBuscarPersona = `${this.URL}/buscar/${idPersona}`;
    //   return this.http.get<Persona>(urlBuscarPersona)
    //     .pipe(
    //       map((response: Persona) => response as Persona)
    //     );
    // }
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
