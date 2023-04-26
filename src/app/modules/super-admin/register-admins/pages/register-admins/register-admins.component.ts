import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { RolServService } from 'src/app/shared/Services/rol-serv.service';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';

@Component({
  selector: 'app-register-admins',
  templateUrl: './register-admins.component.html',
  styleUrls: ['./register-admins.component.css']
})
export class RegisterAdminsComponent {
 
  persona: Persona = new Persona; // instancia de la clase persona 
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol; // instancia de la clase rol 

  // en el constructor instanciamos los servicios
  constructor(private registerUsrService: PersonaServService, private userServiceService: UsuarioServService, private rolservices:RolServService) { }

  ngOnInit() {
  }

  onSubmit() {
  
    this.registerUsrService.postPersona(this.persona).subscribe(response => {
      console.log(response); // Imprime la respuesta de la API en la consola
      this.persona.id_persona = response.id_persona; // a this.persona.id_persona el resultado de nuestro metodo post se aasignamos la data.id_persona que nos arroja la api
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 


      this.rolservices.getById(3).subscribe(response => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
        this.usuario.rol =response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol

        this.userServiceService.postUsuario(this.usuario).subscribe(response => {
          console.log(response); // Imprime la respuesta de la API en la consola
        });

      });

    });
  }

  }
