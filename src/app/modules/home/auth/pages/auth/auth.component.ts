import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  
  iRol: String| undefined = ""; //valiable para asignarla despues
  errorStatus:boolean = false; //valiable para asignarla despues 
  errorMsj:any = "";//valiable para asignarla despues

//cracion de un FormGroup von las varibles para acceder a ellas 
  loginForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  hide = true;
  

 

  ngOnInit(): void {
    //utilizacion del loginForm en el metodo ngOnInit para que se ejecute al momento de iniciar este componente
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.removeItem('id');
  }

// Delaracion de servicios y FormBuilder para su utilizacion en los metodos  
  constructor(private fb: FormBuilder , private usuarioService: UsuarioService, private router: Router,private cookieservice:CookieService) { }

// metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
  goToAdmin() :void{

    this.router.navigate(['/Admin'])


   }
   goTosupAdmin() :void{

    this.router.navigate(['/Supadmin'])


   }
// metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
   goToCapacitador() :void{

    this.router.navigate(['/Capacitador'])


   }
   // metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
   goToParticipante() :void{

    this.router.navigate(['/Participante'])


   }
  
/*
En este metodo llamado login recibe un parametro de tipo any en este caso form en la cual  nos ayudara ingresar 

*/
login(form: any) {
  this.usuarioService.login(this.usuario.username, this.usuario.password).subscribe(
    (data: any) => {
      if (data != null) {
        if (data.id_usuario) {
          this.usuario.id_usuario = data.id_usuario;
          localStorage.setItem('id_persona', String(data.persona?.id_persona));
          localStorage.setItem('id_usuario', String(data.id_usuario));
          this.iRol = data.rol.rolNombre;

          Swal.fire({
            title: 'Inicio de sesión exitoso',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            if (this.iRol == 'Participante') {
              this.goToParticipante();
            } else if (this.iRol == 'Admin') {
              this.goToAdmin();
            } else if (this.iRol == 'Supadmin') {
              this.goTosupAdmin();
            } else if (this.iRol == 'Docente') {
              this.goToCapacitador();
            }
          });
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
    }
  );
}

}
