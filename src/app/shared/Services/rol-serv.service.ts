import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolServService {

  private URL2 = "http://localhost:8080/api/persona"; 
  constructor(private http: HttpClient) { }
  
  // listarPersona(): Observable<any> {
  //   return this.http.get(`${this.URL2}/listar`);
  // }
  // listarPer(): Observable<any> {
  //   return this.http.get(`${this.URL2}/listarP`);
  // }
  // buscarpersona(cedula: string) {
  //   return this.http.get<boolean>(this.URL2 + `buscar/${cedula}`)
  // }
  // buscarper(id_persona: string) {
  //   return this.http.get<boolean>(this.URL2 + `buscar/${id_persona}`)
  // }

  // getPorId(id_persona: number) {
  //   return this.http.get<Persona>(this.URL3 + id_persona);
  // }

  // getPer() {
  //   return this.http.get<Persona[]>(this.URL2 + '/listar');
  // }

  // deletepersona(per: Persona, id_persona: number) {
  //   return this.http.put<Persona>(this.URL2+ `/eliminar/${id_persona}`, per);
  // }
  // updateperson(persona: Persona, id_persona: number) {
  //   return this.http.put<Persona>(this.URL2+ `/actualizar/${id_persona}`, persona);
  // }
}
