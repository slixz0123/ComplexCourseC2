import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { Persona } from 'src/app/Core/models/persona';
import { tap, map } from 'rxjs/operators';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private URL = 'http://localhost:8080/usuarios';
  private URLcre = 'http://localhost:8080/usuarios/signup';
  private usuariosApiUrl = 'http://localhost:8080/usuarios/users/list';
  private personasApiUrl = 'http://localhost:8080/api/persona/buscar';
  private rolesApiUrl = 'http://localhost:8080/api/rol/buscar';
  

  constructor(private http: HttpClient, private rol:RolService) {}

//Listar usuarios por rol---------------------------------------------------------
// listarUsuarios(): Observable<Usuario[]> {
//   return this.http.get<Usuario[]>(this.usuariosApiUrl).pipe(
//     switchMap((usuarios) => {
//       const requests = usuarios
//         .filter((usuario) => usuario.enabled) // <-- Filtro por usuarios activos
//         .map((usuario) =>
//           forkJoin({
//             usuario: of({ ...usuario, username: usuario.username || '', password: usuario.password || '' }),
//             persona:
//               usuario.persona && usuario.persona.id_persona
//                 ? this.getPersona(usuario.persona.id_persona)
//                 : of(undefined),
//             rol2:
//               usuario.rol2 && usuario.rol2.id_rol
//                 ? this.getRol(usuario.rol2.id_rol)
//                 : of(undefined),
//           })
//         );
//       return forkJoin(requests);
//     }),
//     tap((usuariosWithDetails) =>
//       usuariosWithDetails.map(({ usuario, persona, rol2 }) => {
//         usuario.persona = persona;
//         usuario.rol2 = rol2;
//       })
//     ),
//     map((usuariosWithDetails) => usuariosWithDetails.map(({ usuario }) => usuario))
//   );
// }

getpersonarol(idPersona:any,idRol: any) {
  return this.http.get<Usuario>(`${this.URL}/rolpersonaexist/`+ idPersona+`/`+idRol);
}

updateUsuariorol(usuario:Usuario, idUsuario: any, estado: any) {
  return this.http.put<Usuario>(this.URL + `/cambiarestadouser/${idUsuario}/${estado}`,usuario);
}
saveUsuario(usuario: Usuario) {
  return this.http.post<Usuario>(`${this.URL}/signup/`, usuario);
}

private getPersona(id: number): Observable<Persona> {
  return this.http.get<Persona>(`${this.personasApiUrl}/${id}`);
}

private getRol(id: number): Observable<Rol> {
  return this.http.get<Rol>(`${this.rolesApiUrl}/${id}`);
}

signup(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(`${this.URLcre}/signup`, usuario);
}

crearUsuario(usuario: Usuario): Observable<Usuario> {
  // return this.http.post<Usuario>(this.URL + '/signup', Usuario);
  return this.rol.buscarNombre("Participante").pipe(
    switchMap((rol: Rol) => {
      return this.http.post<Usuario>(this.URLcre, usuario);
    })
  );
}
//---------------------------------------------------------------------------------

  //utilizados
  login(nombreUsuario: string, password: string) {
    // http://localhost:8080/usuario/login/
    return this.http.get<Usuario>(
      this.URL + `/login/${nombreUsuario}/${password}`
    );
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.URLcre +'', usuario);
  }

  

  //sin utilizar

  getusuario() {
    return this.http.get<Usuario[]>(`${this.URL}/listarp`);
  }

  getPorusrId(id_usuario: number) {
    return this.http.get<Usuario>(this.URL + id_usuario);
  }

  updateUsuario(usuario: Usuario, id_usuario: any) {
    return this.http.put<Usuario>(
      this.URL + `/actualizar/${id_usuario}`,
      usuario
    );
  }

  deleteUsuario(idPersona: number) {
    return this.http.delete<boolean>(this.URL + `/eliminar/${idPersona}`);
  }

  deleteusuario(idUsuario: number, usuario: Usuario) {
    return this.http.put<boolean>(this.URL + `/eliminar/${idUsuario}`, usuario);
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
