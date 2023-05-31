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
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private URL = UrlApi+"/usuarios";
  private URLcheck = UrlApi+"";
  private URLb = UrlApi+"/usuarios/buscar/";
  private URLu = UrlApi+"/usuarios/buscarusr/username/";
  private URLcre = UrlApi+"/usuarios/signup";
  private usuariosApiUrl = UrlApi+"/usuarios/users/list";
  private personasApiUrl = UrlApi+"/api/persona/buscar";
  private signupUrl = UrlApi+"/api/auth/signup";
  private rolesApiUrl = UrlApi+"/api/rol/buscar";
  private signinUrl = UrlApi+"/api/auth/signin";
  private generateTokenUrl = UrlApi+"/api/auth/generate-token";
  private token: string = "";
  private userRole: string = "";
  constructor(private http: HttpClient, private rol: RolService) { }

  setToken(token: string) {
    this.token = token;
  }

  // Implementa un método para obtener el token
  getToken() {
    return this.token;
  }
  setRoles(role: string) {
    this.userRole = role;
  }

  // Implementa un método para obtener el rol de usuario
  getRoles() {
    return this.userRole;
  }

  registerUser(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(this.signupUrl, signupRequest);
  }

  getUserByUsername(username: string): Observable<Usuario> {
    const url = this.URLu + username;
    return this.http.get<Usuario>(url);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.signinUrl, loginRequest);
  }

  generateToken(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.generateTokenUrl, loginRequest);
  }

  checkPersonaHasUser(personaId: number): Observable<Usuario> {
    const url = `${this.URLcheck}/usuarios/checkPersonaHasUser/${personaId}`;
    return this.http.get<Usuario>(url);
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

  getpersonarol(idPersona: any, idRol: any) {
    return this.http.get<Usuario>(`${this.URL}/rolpersonaexist/` + idPersona + `/` + idRol);
  }

  updateUsuariorol(usuario: Usuario, idUsuario: any, estado: any) {
    return this.http.put<Usuario>(this.URL + `/cambiarestadouser/${idUsuario}/${estado}`, usuario);
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

  private rolActual: string = '';
  setRol(rol: string) {
    this.rolActual = rol;
  }
  obtenerRol(): string {
    return this.rolActual;
  }

  getPorId(idUsuario: any) {
    return this.http.get<Usuario>(this.URLb + idUsuario);
  }

  updateUsuario(usuario: Usuario, id_usuario: any) {
    return this.http.put<Usuario>(
      this.URL + `/actualizar/${id_usuario}`,
      usuario
    );
  }

}
