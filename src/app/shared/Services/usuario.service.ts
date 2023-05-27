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
import { SignupRequest } from 'src/app/Core/models/SingUpRequest';
import { LoginRequest } from 'src/app/Core/models/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private URL = 'http://localhost:8080/usuarios';
  private URLb = 'http://localhost:8080/usuarios/buscar/';
  private URLu = 'http://localhost:8080/usuarios/search/';

  private URLcre = 'http://localhost:8080/usuarios/signup';
  
  private usuariosApiUrl = 'http://localhost:8080/usuarios/users/list';
  private personasApiUrl = 'http://localhost:8080/api/persona/buscar';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private rolesApiUrl = 'http://localhost:8080/api/rol/buscar';
 
  private signinUrl = 'http://localhost:8080/api/auth/signin';
  private generateTokenUrl = 'http://localhost:8080/api/auth/generate-token';

  constructor(private http: HttpClient, private rol:RolService) {}
  registerUser(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(this.signupUrl, signupRequest);
  }
  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.signinUrl, loginRequest);
  }

  generateToken(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.generateTokenUrl, loginRequest);
  }
//Listar usuarios por rol---------------------------------------------------------
listarUsuariosAdmin(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.usuariosApiUrl).pipe(
    switchMap((usuarios) => {
      const requests = usuarios
        .filter((usuario) => usuario.rol?.rolNombre == 'ROLE_ADMIN') // <-- Filtro por usuarios Admin
        .map((usuario) =>
          forkJoin({
            usuario: of({ ...usuario, username: usuario.username || '', password: usuario.password || '' }),
            persona:
              usuario.persona && usuario.persona.id_persona
                ? this.getPersona(usuario.persona.id_persona)
                : of(undefined),
            rol:
              usuario.rol && usuario.rol.id_rol
                ? this.getRol(usuario.rol.id_rol)
                : of(undefined),
          })
        );
      return forkJoin(requests);
    }),
    tap((usuariosWithDetails) =>
      usuariosWithDetails.map(({ usuario, persona, rol }) => {
        usuario.persona = persona;
        usuario.rol = rol;
      })
    ),
    map((usuariosWithDetails) => usuariosWithDetails.map(({ usuario }) => usuario))
  );
}

listarUsuariosDocente(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.usuariosApiUrl).pipe(
    switchMap((usuarios) => {
      const requests = usuarios
        .filter((usuario) => usuario.rol?.rolNombre == 'ROLE_DOCENTE') // <-- Filtro por usuarios Docente
        .map((usuario) =>
          forkJoin({
            usuario: of({ ...usuario, username: usuario.username || '', password: usuario.password || '' }),
            persona:
              usuario.persona && usuario.persona.id_persona
                ? this.getPersona(usuario.persona.id_persona)
                : of(undefined),
            rol:
              usuario.rol && usuario.rol.id_rol
                ? this.getRol(usuario.rol.id_rol)
                : of(undefined),
          })
        );
      return forkJoin(requests);
    }),
    tap((usuariosWithDetails) =>
      usuariosWithDetails.map(({ usuario, persona, rol }) => {
        usuario.persona = persona;
        usuario.rol = rol;
      })
    ),
    map((usuariosWithDetails) => usuariosWithDetails.map(({ usuario }) => usuario))
  );
}
//---------------------------------------------------------------------------------

getpersonarol(idPersona:any,idRol: any) {
  return this.http.get<Usuario>(`${this.URL}/rolpersonaexist/`+ idPersona+`/`+idRol);
}

updateUsuariorol(usuario:Usuario, idUsuario: any, estado: any) {
  return this.http.put<Usuario>(this.URL + `/cambiarestadouser/${idUsuario}/${estado}`,usuario);
}
saveUsuario(usuario: Usuario) {
  return this.http.post<Usuario>(`${this.URL}/signup/`, usuario);
}

 getPersona(id: number): Observable<Persona> {
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
private rolActual: string ='';
setRol(rol: string) {
  this.rolActual = rol;
}
obtenerRol(): string {
  return this.rolActual;
}


  //utilizados
  login(nombreUsuario: string, password: string) {
    return this.http.get<Usuario>(this.URL + `/login/${nombreUsuario}/${password}`).pipe(
      tap((usuario: Usuario) => {
        if (usuario && usuario.rol) {
          this.setRol(usuario.rol.rolNombre);
        }
      })
    );
  }
  
  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.URLcre +'', usuario);
  }
  
  getPorId(idUsuario: any) {
    return this.http.get<Usuario>(this.URLb + idUsuario);
  }

  //sin utilizar

  getusuario() {
    return this.http.get<Usuario[]>(`${this.URL}/users/list`);
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
