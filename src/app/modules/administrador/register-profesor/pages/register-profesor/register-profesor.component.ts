import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { RolServService } from 'src/app/shared/Services/rol-serv.service';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';

@Component({
  selector: 'app-register-profesor',
  templateUrl: './register-profesor.component.html',
  styleUrls: ['./register-profesor.component.css']
})
export class RegisterProfesorComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol; // instancia de la clase rol 

  // en el constructor instanciamos los servicios
  constructor(private persoUsrService: PersonaServService, private userServiceService: UsuarioServService, private rolservices:RolServService) { }

  ngOnInit() {
  }

  onSubmit() {
  
    this.persoUsrService.postPersona(this.persona).subscribe((response:any) => {
      console.log(response); // Imprime la respuesta de la API en la consola
      this.persona.id_persona = response.id_persona; // a this.persona.id_persona el resultado de nuestro metodo post se aasignamos la data.id_persona que nos arroja la api
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 


      this.rolservices.getById(2).subscribe((response:any) => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
        this.usuario.rol =response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol

        this.userServiceService.postUsuario(this.usuario).subscribe((response: any) => {
          console.log(response); // Imprime la respuesta de la API en la consola
        });

      });

    });

    /////validar si la cédula es correcta de acuerdo a los parámetros     
    const validar=new claseValidaciones();
    if (this.persona.cedula !== undefined){
      console.log(this.persona)
      if(this.persona.cedula.length===10){
        const esValida = validar.validarCedula(this.persona.cedula);
        if(esValida){
          alert('Lacédula es correcta');
        }else{
          alert('La cédula ingresada es incorrecta');
        }
      }else{
        alert('La cédula debe contener exactamente 10 caracteres numéricos')
      }
    }else{
      Error('La cédula no se encuentra en la base de datos')
    }

    if(this.usuario.username!== null){
      const validaruser=validar.validarLetrasNumeros(this.usuario.username);
        if(validaruser){

        }
      }
    }
  }

