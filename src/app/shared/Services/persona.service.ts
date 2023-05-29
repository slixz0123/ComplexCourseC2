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

  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/persona";

  constructor(private http: HttpClient) { }

  crearPersona(persona: Persona) {
    return this.http.post<Persona>(`${this.URL}/crear`, persona);
  }

  getPersonaCedula(cedula: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.URL}/personacedula/${cedula}`);
  }

  getPorId(idPersona: any) {
    return this.http.get<Persona>(`${this.URL}/buscar/` + idPersona);
  }

  updatePersona(persona: Persona, idPersona: any) {
    return this.http.put<Persona>(this.URL + `/actualizar/${idPersona}`, persona);
  }

  // uploadHojaVida(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post<any>(`${this.URL}/hojavida`, formData);
  // }

  // guardarHojavida(formData: FormData) {
  //   return this.http.post<any>(`${this.apiUrl}/guardar-hojavida`, formData);
  // }

  // updatePersonaWithFile(formData: FormData, persona: Persona, id_persona: number) {
  //   formData.append('id_persona', id_persona.toString());
  //   formData.append('cedula', persona.cedula || '');
  //   formData.append('nombre', persona.nombre || '');
  //   formData.append('apellido', persona.apellido || '');
  //   formData.append('email', persona.email || '');
  //   formData.append('direccion', persona.direccion || '');
  //   formData.append('sexo', persona.sexo || '');
  //   formData.append('etnia', persona.etnia || '');
  //   formData.append('telefono', persona.telefono || '');
  //   formData.append('celular', persona.celular || '');
  //   formData.append('nivelintruccion', persona.nivelintruccion || '');
  //   formData.append('hojavida', persona.hojavida || '');

  //   // Agrega otros campos de la persona que deseas actualizar

  //   return this.http.post<any>(`${this.URL}/guardar-hojavida`, formData);
  // }
}
