import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServService {

   // private apiUrl = 'http://localhost:8080/api/persona/crear'; // Reemplaza con la URL de tu API
   private URL = "http://localhost:8080/usuarios";
   private URLcre = "http://localhost:8080/usuarios/signup";

   constructor(private http: HttpClient) { }
 
  //utilizados 
  login(nombreUsuario: string, password: string) {
    // http://localhost:8080/usuario/login/
    return this.http.get<Usuario>(this.URL + `/login/${nombreUsuario}/${password}`)
  }
  
  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.URLcre + '?', usuario);
  }
  
  //sin utilizar

   getusuario() {
     return this.http.get<Usuario[]>(`${this.URL}/listarp`);
   }
 
   getPorusrId(id_usuario: number) {
     return this.http.get<Usuario>(this.URL + id_usuario);
   }
 
   
 
   updateUsiario(usuario: Usuario, id_usuario: any) {
     return this.http.put<Usuario>(this.URL + `actualizar/${id_usuario}`, usuario);
   }
 
   deleteUusario(idPersona: number) {
     return this.http.delete<boolean>(this.URL + `eliminar/${idPersona}`);
   }
 
   saveusr(usuario: Usuario) {
     return this.http.post(`${this.URL}/`, usuario);
   }
 
   listarusr(): Observable<any> {
     return this.http.get(`${this.URL}listaper`);
   }
 
   getPorCedula(id_usuario: any) {
     return this.http.get<Usuario>(this.URL + `buscarpersona/${id_usuario}`);
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

