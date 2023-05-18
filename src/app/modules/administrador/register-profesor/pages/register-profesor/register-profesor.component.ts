import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import Swal from 'sweetalert2';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';

@Component({
  selector: 'app-register-profesor',
  templateUrl: './register-profesor.component.html',
  styleUrls: ['./register-profesor.component.css']
})
export class RegisterProfesorComponent {
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol;// instancia de la clase rol
  usuariova: Usuario = new Usuario; // instancia de la clase usuario  
  cedula: string = '';
  nombreDeUsuario: string = '';
  validardatos: any;
  idPersona: any;
  // en el constructor instanciamos los servicios
  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private rolservices: RolService
  ) { }
  ngOnInit() {
    this.obtenerRol();
    // this.ValidarRole();
    this.idPersona = localStorage.getItem('id_persona')
    console.log(this.idPersona)
  }

  personaVacio() { }
  buscarPersona(cedula: any) {
    this.personaService.getPersonaCedula(cedula).subscribe((data: any) => {
      if (null != data) {
        this.persona = data;
        console.log(this.persona)
        this.ValidarRole(this.persona.id_persona);
      } else {
        Swal.fire('¡Alerta!', 'Persona no encontrada, se guardara solo su cedula, podra actualizar sus datos despues', 'info'); // SweetAlert al editar el área
        this.validardatos = 2;
        this.persona.id_persona = 0;
        this.persona.cedula = cedula;
        this.persona.nombre = "Asignar";
        this.persona.apellido = "Asignar";
        this.persona.fecha_nacimiento = new Date('2000-01-01');
        this.persona.email = "Asignar";
        this.persona.direccion = "Asignar";
        this.persona.sexo = "Asignar";
        this.persona.telefono = "Asignar";
        this.persona.celular = "Asignar";
        this.persona.etnia = "Asignar";
        this.persona.nivelintruccion = "Asignar";
        this.persona.hojavida = "Asignar";
        this.persona.enabled = true;
      }
    });
  }
  ValidarRole(idPersona: any) {
    //id del rol 2=docente
    this.usuarioService.getpersonarol(idPersona, 2).subscribe((response: any) => {
      console.log(response);
      if (response != null) {
        if (response.enabled == true) {
          Swal.fire('¡Alerta!', 'La persona ya tiene una cuenta de Docente Activa', 'info'); // SweetAlert al editar el área
          //Limpiar datos 
        } else {
          // Swal.fire('¡Alerta!', 'La persona ya tiene una cuenta de Docente, desea activarla?', 'info'); // SweetAlert al editar el área
          Swal.fire({
            title: 'La persona ya tiene una cuenta de Docente, ¿desea activarla?',
            showCancelButton: true,
            confirmButtonText: 'Activar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.ActualizarEstadouser(response, response.id_usuario);
            }
          });

        }
      } else {
        Swal.fire('¡Alerta!', 'La persona existe pero no tiene cuenta Docente', 'info'); // SweetAlert al editar el área
        this.validardatos = 1;
      }
    });
  }
  obtenerRol() {
    //id del rol 2=docente
    this.rolservices.getById(2).subscribe((response: any) => {
      console.log("mi rol")
      console.log(response); // Imprime la respuesta de la API en la consola
      this.rol = response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol
    });
  }
  ActualizarEstadouser(usuario: Usuario, idUsuario: any) {
    console.log("datos actualizados")
    this.usuarioService.updateUsuariorol(usuario, idUsuario, true).subscribe(
      (data: any) => {
        console.log('a verrr' + data);
        console.log
        Swal.fire('¡Éxito!', 'El usuario fue activado correctamente', 'success'); // SweetAlert al editar el área
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    if (this.validardatos == 1) {
      this.usuario.rol = this.rol
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 
      this.usuario.enabled = true;
      this.usuario.id_usuario = 0;
      this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
        console.log("Afirmativo pareja")
        Swal.fire('¡Éxito!', 'Registro del usuario existoso', 'success');
      }, error => {
      });
    } else {
      this.personaService.crearPersona(this.persona).subscribe((response: any) => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.usuario.persona = response;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 
        this.usuario.rol = this.rol;
        this.usuario.enabled = true;
        this.usuario.id_usuario = 0;
        console.log(this.usuario)
        this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
          console.log("Afirmativo pareja")
          Swal.fire('¡Éxito!', 'Registro del usuario existoso', 'success');
        }, error => {
        });
      });
    }
  }
}

  /////validar si la cédula es correcta de acuerdo a los parámetros
  // const validar=new claseValidaciones();
  // if (this.persona.cedula !== undefined){
  //   console.log(this.persona)
  //   if(this.persona.cedula.length===10){
  //     const esValida = validar.validarCedula(this.persona.cedula);
  //     if(esValida){
  //       alert('Lacédula es correcta');
  //     }else{
  //       alert('La cédula ingresada es incorrecta');
  //     }
  //   }else{
  //     alert('La cédula debe contener exactamente 10 caracteres numéricos')
  //   }
  // }else{
  //   Error('La cédula no se encuentra en la base de datos')
  // }

  // if(this.usuario.username!== null){
  //   const validaruser=validar.validarLetrasNumeros(this.usuario.username);
  //     if(validaruser){


  //     }
  //   }
