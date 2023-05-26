import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';
import { CargarjsHomeService } from '../../../services/cargarjs-home.service';

@Component({
  selector: 'app-register-usr',
  templateUrl: './register-usr.component.html',
  styleUrls: ['./register-usr.component.css']
})
export class RegisterUsrComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol; // instancia de la clase rol 

  // en el constructor instanciamos los servicios
  constructor(private persoUsrService: PersonaService, private userServiceService: UsuarioService, private rolservices:RolService,_cargrasjs:CargarjsHomeService) {
    _cargrasjs.carga_jquery(['pass'])
   }

  ngOnInit() {
  }

  onSubmit() {


      this.persoUsrService.crearPersona(this.persona).subscribe(response => {
      console.log(response); // Imprime la respuesta de la API en la consola
      this.persona.id_persona = response.id_persona; // a this.persona.id_persona el resultado de nuestro metodo post se aasignamos la data.id_persona que nos arroja la api
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 


      this.rolservices.getById(1).subscribe(response => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
        this.usuario.rol =response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol

        this.userServiceService.postUsuario(this.usuario).subscribe(response => {
          console.log(response); // Imprime la respuesta de la API en la consola
        });

      });

    });


    //////////Estas son las validaciones
  //   const validaciones = new claseValidaciones();
  //   if(this.persona.cedula!=undefined){
  //     if(this.persona.cedula.length===10){
  //       const esValida = validaciones.validarCedula(this.persona.cedula);
  //       if (esValida) {
  //         alert('Cédula Correcta');
  //       } else {
  //         alert('Cédula Incorrecta');
  //       }
  //     }else{
  //       alert('La cédula debe contener exáctamente 10 dígitos numéricos');
  //     }
  //   }

  //   if(this.persona.nombre!=undefined){
  //     const validNombre=validaciones.validarLetras(this.persona.nombre);
  //     if(!validNombre){
  //       alert('Nombre Correcto');
  //     }else{
  //       alert('El nombre debe contener solo letras');
  //     }
  //   }

  //   if(this.persona.apellido!=undefined){
  //     const validNombre=validaciones.validarLetras(this.persona.apellido);
  //     if(!validNombre){
  //       alert('Apellido Correcto');
  //     }else{
  //       alert('El apellido debe contener solo letras');
  //     }
  //   }

  //   if(this.persona.email!=undefined){
  //     const validEmail=validaciones.validarEmail(this.persona.email);
  //     if(validEmail){
  //       alert('Email Correcto');
  //     }else{
  //       alert('Email Incorrecto');
  //     }
  //   }
  }
}
