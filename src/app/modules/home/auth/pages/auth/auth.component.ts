import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from 'src/app/Core/models/LoginRequest';
import { Usuario } from 'src/app/Core/models/usuario';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  usuario: Usuario = new Usuario; // instancia de la clase usuario 
  tipoUser: any; //variable para asignarla despues
  user: any;//valiable para asignarla despues

  iRol: string = ""; //valiable para asignarla despues
  errorStatus: boolean = false; //valiable para asignarla despues 
  errorMsj: any = "";//valiable para asignarla despues

  //cracion de un FormGroup von las varibles para acceder a ellas 
  loginForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  hide = true;




  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    // Intenta obtener el token
    const token = localStorage.getItem('token');
    const rolNombre = localStorage.getItem('rolNombre');

    // Si token y rolNombre no son nulos, los estableces en el servicio
    if (token && rolNombre) {
        this.usuarioService.setToken(token);
        this.usuarioService.setRoles(rolNombre);
    } else {
      // Si el token no existe, elimina los demás datos de la sesión
      localStorage.removeItem('id');
      localStorage.removeItem('id_usuario');
      localStorage.removeItem('id_persona');
      localStorage.removeItem('rolNombre');
      localStorage.removeItem('id_rol');
    }
  }
  
 

  // Delaracion de servicios y FormBuilder para su utilizacion en los metodos  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, private cookieservice: CookieService) { }

  // metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
  goToAdmin(): void {

    this.router.navigate(['/Admin'])
    console.log("Navegando a Admin");

  }
  goTosupAdmin(): void {

    this.router.navigate(['/Sup-Admin'])
    console.log("Navegando a Sup-Admin");

  }
  // metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
  goToCapacitador(): void {
    console.log("Navegando a Capacitador");
    this.router.navigate(['/Capacitador'])


  }
  // metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
  goToParticipante(): void {
    console.log("Navegando a Participante");
    this.router.navigate(['/Participante'])


  }

  /*
  En este metodo llamado login recibe un parametro de tipo any en este caso form en la cual  nos ayudara ingresar 
  
  */
  loginRequest: any = {};


  onLogin(form: any) {
    if (form.valid) {
      this.usuarioService.loginUser(this.loginRequest).subscribe(
        (data: any) => {
          console.log(data);
          if (data != null) {
            if (data.id_usuario) {
              this.usuario.id_usuario = data.id_usuario;
              this.iRol = data.roles;
              this.generateToken();
              this.usuarioService.setRol(this.iRol);  // Set the role after the token has been generated
              this.traerdatos(data.id_usuario);
              console.log(this.traerdatos(data.id_usuario));
  
              // Código para el caso de inicio de sesión exitoso
              // Puedes redireccionar a una página específica o realizar otras acciones necesarias
              if (this.iRol == 'ROLE_PARTICIPANTE') {
                this.goToParticipante();
              } else if (this.iRol == 'ROLE_ADMIN') {
                this.goToAdmin();
              } else if (this.iRol == 'ROLE_SUPADMIN') {
                this.goTosupAdmin();
              } else if (this.iRol == 'ROLE_DOCENTE') {
                this.goToCapacitador();
              }
            } else {
              Swal.fire({
                title: 'Usuario inhabilitado, no puede ingresar',
                icon: 'warning'
              });
              this.usuario = new Usuario();
            }
          } else {
            Swal.fire({
              title: 'USERNAME O PASSWORD INCORRECTOS',
              icon: 'error'
            });
            this.usuario = new Usuario();
          }
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({
              title: 'USERNAME O PASSWORD INCORRECTOS',
              text: 'El usuario o contraseña proporcionada es incorrecta',
              icon: 'error'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error en el inicio de sesión',
              icon: 'error'
            });
          }
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos',
        icon: 'warning'
      });
    }
  }
  traerdatos(idusuario: any) {
    this.usuarioService.getPorId(idusuario).subscribe(
      (data: any) => {
        this.usuario = data
        // traerdatos(this.usuario.id_usuario);
        localStorage.setItem('id_persona', String(this.usuario.persona?.id_persona));
        localStorage.setItem('id_usuario', String(this.usuario.id_usuario));
        localStorage.setItem('rolNombre', String(this.usuario.rol?.rolNombre));
        localStorage.setItem('id_rol', String(this.usuario.rol?.id_rol));
        
      }
    );
  }

  logout(): void {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
  
    // Eliminar la cookie del token
    this.cookieservice.delete('token');
  
    // Otras acciones necesarias para cerrar sesión, como redireccionar al inicio de sesión, etc.
  }
  generateToken(): void {
    this.usuarioService.generateToken(this.loginRequest).subscribe(
      (response: any) => {
        console.log(response);
        this.cookieservice.set('token', response.token); 
        console.log(response)
        localStorage.setItem('token', response.token);
        console.log(this.iRol)
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          if (this.iRol == 'ROLE_PARTICIPANTE') {
            this.goToParticipante();
          } else if (this.iRol == 'ROLE_ADMIN') {
            this.goToAdmin();
          } else if (this.iRol == 'ROLE_SUPADMIN') {
            this.goTosupAdmin();
          } else if (this.iRol == 'ROLE_DOCENTE') {
            this.goToCapacitador();
          }
        });
      },


    );
  }


}
