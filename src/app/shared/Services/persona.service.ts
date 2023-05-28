import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Core/models/persona';
import { Usuario } from 'src/app/Core/models/usuario';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
    // buscarPersona(id_persona: number) {
    //   throw new Error('Method not implemented.');
    // }


    private URL = "http://localhost:8080/api/persona";
    private URLcre = "http://localhost:8080/api/persona/crear";
    private URLced = "http://localhost:8080/api/persona/cedulas/";
    private URLusuario="http://localhost:8080/usuarios/signup";

    private readonly apiUrl = 'http://localhost:8080/api/persona';


    constructor(private http: HttpClient) { }
  
    //utiliizados
    

  //   createUser(usuario: Usuario): Observable<Usuario> {
  //     return this.http.post<Usuario>(`${this.URLusuario}/signup`, usuario);
  // }

    crearPersona(persona: Persona) {
      return this.http.post<Persona>(`${this.URL}/crear`,persona);
    }

    getPersonaCedula(cedula: string): Observable<Persona> {
      return this.http.get<Persona>(`${this.URL}/personacedula/${cedula}`);
    }
  
    
    

    public buscarPorCedula(cedula: string): Observable<Persona> {
      return this.http.get<Persona>(this.URLced + cedula);
    }

    create(persona: Persona): Observable<Persona> {
      return this.http.post<Persona>(`${this.apiUrl}/crear`, persona);

    }

   



      listarPersonas(){
        return this.http.get<Persona[]>(this.URL+'/listarpersona');
      }
// sin utilizar

    getPersonas() {
      return this.http.get<Persona[]>(`${this.URL}/listarpersona`);
    }
  
    getPorId(idPersona: any) {
      return this.http.get<Persona>(`${this.URL}/buscar/` + idPersona);
    }
  
   
  
    updatePersona(persona: Persona, idPersona: any) {
      return this.http.put<Persona>(this.URL + `/actualizar/${idPersona}`, persona);
    }
  
    deletePersona(idPersona: number) {
      return this.http.delete<boolean>(this.URL + `/eliminar/${idPersona}`);
    }

    deletepersona(idPersona: number, persona: Persona) {
      return this.http.put<boolean>(this.URL + `/eliminar/${idPersona}`, persona);
    }
  
    save(persona: Persona) {
      return this.http.post(`${this.URL}/`, persona);
    }
  
    listarPersona(): Observable<any> {
      return this.http.get(`${this.URL}/listaper`);
    }
    getAll(): Observable<Persona[]> {
      return this.http.get<Persona[]>(`${this.URL}/listaper`);
    }
  
    getPorCedula(id_persona: any) {
      return this.http.get<Persona>(this.URL + `/buscar/${id_persona}`);
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
    uploadHojaVida(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);    
      return this.http.post<any>(`${this.URL}/hojavida`, formData);
    }

    guardarHojavida(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/guardar-hojavida`, formData);
  }
  updatePersonaWithFile(formData: FormData, persona: Persona, id_persona: number) {
    formData.append('id_persona', id_persona.toString());
    formData.append('cedula', persona.cedula || '');
    formData.append('nombre', persona.nombre || '');
    formData.append('apellido', persona.apellido || '');
    formData.append('email', persona.email || '');
    formData.append('direccion', persona.direccion || '');
    formData.append('sexo', persona.sexo || '');
    formData.append('etnia', persona.etnia || '');
    formData.append('telefono', persona.telefono || '');
    formData.append('celular', persona.celular || '');
    formData.append('nivelintruccion', persona.nivelintruccion || '');
    formData.append('hojavida', persona.hojavida || '');
    
    // Agrega otros campos de la persona que deseas actualizar

    return this.http.post<any>(`${this.URL}/guardar-hojavida`, formData);
}
}
