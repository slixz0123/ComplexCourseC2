import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from 'src/app/Core/models/usuario';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';

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
  constructor(private fb: FormBuilder , private usuarioService: UsuarioServService, private router: Router,private cookieservice:CookieService) { }

// metodo para redireccionar a las rutas verificando el rol del usuario que ingrese, recibe un parametro de un  evento
  goToAdmin() :void{

    this.router.navigate(['/Admin'])


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
    /*
Se utiliza el metodo login ubicado en el servicio  UserServiceService en la cual realiza una consulta a la api 
 en la que recibe el parametro de username y password  ubacdos en el objeto de usuario 
    */
    this.usuarioService.login(this.usuario.username, this.usuario.password).subscribe(
      (data:any) => {
        console.log(data);

        // valida que el resultado de la consulta no sea nulo es decir data debe ser diferente a null 
        if (data != null) {
        // se  valida que si este usuario tiene un id_usuario compile la continuacion del codigo 
          if (data.id_usuario) {

            this.usuario.id_usuario = data.id_usuario; // asignamos la data.id_usuario a this.usuario.id_usuario

            localStorage.setItem('id_persona', String( data.persona?.id_persona)); // se utiliza el localStorage para guardar el id_persona y para poder realizar la transaccionalidad 

              this.iRol = data.rol.rolNombre; //se asigna la  data.rol.rolNombre a la variable iRol para realizar el redireccionamiento de nuestra pagina 
             this.cookieservice.set('token_acces',data.accessToken,4,'/')
              // condiciona y valida que si el rol tiene un valor de ADMINISTRADOR nos redirije a la ruta del administrador devido a que se encuentra el metodo de redireccion 
              if(this.iRol == "Participante"){
               this.goToParticipante()
              } // en caso de que no se cumpla la condicion esta misma ejecuta el emtodo que redirecciona al usuario a la pagina con privilegios de cliente 
              else if(this.iRol == "Admin"){
                this.goToAdmin()
              }else if(this.iRol == "Docente"){
                this.goToCapacitador()
              }
          // en caso de que el usario no contenga un id lanza un mensaje por consola 
          } else {
            console.log("Usuario inhabilitado, no puede ingresar!", "Advertencia!");
            this.usuario = new Usuario;
        
          }
  // en caso de que el usario o la contraseña sean incorrectos lanzara un mennsaje por consola   // en caso de que el usario o la contraseña sean incorrectos lanzara un mennsaje por consola 
        } else {
          console.log("USERNAME O PASSWORD INCORRECTOS!", "Login");
          this.usuario = new Usuario;
      

        }

      }
    )
  }



}
