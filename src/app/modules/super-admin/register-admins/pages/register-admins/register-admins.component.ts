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
  selector: 'app-register-admins',
  templateUrl: './register-admins.component.html',
  styleUrls: ['./register-admins.component.css'],
})
export class RegisterAdminsComponent {
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol;// instancia de la clase rol
  usuariova: Usuario = new Usuario; // instancia de la clase usuario  
  cedula: string = '';
  nombreDeUsuario: string = '';
  validardatos: any;
  validarAdminExist: any;
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
    
  }

  personaVacio() { }
  buscarPersona(cedula: any) {
    this.personaService.getPersonaCedula(cedula).subscribe((data: any) => {
      if (null != data) {
        this.persona = data;
        
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
        this.validarAdminExist = 1;
      }
    });
  }
  ValidarRole(idPersona: any) {
    //id del rol 3=admin
    this.usuarioService.getpersonarol(idPersona, 3).subscribe((response: any) => {
      
      if (response != null) {
        if (response.enabled == true) {
          Swal.fire('¡Alerta!', 'Esta Persona ya tiene una cuenta de ADMINISTRADOR Activa', 'info'); // SweetAlert al editar el área
          //Limpiar datos 
          this.validarAdminExist = 2;
        } else {
          Swal.fire({
            title: 'La persona ya tiene una cuenta de Admin, ¿desea activarla?',
            showCancelButton: true,
            confirmButtonText: 'Activar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.ActualizarEstadouser(response, response.id_usuario);
              this.validarAdminExist = 2;
            }
          });

        }
      } else {
        Swal.fire('¡Alerta!', 'La persona existe pero no tiene cuenta de Administrador', 'info'); // SweetAlert al editar el área
        this.validardatos = 1;
        this.validarAdminExist = 1;
      }
    });
  }
  obtenerRol() {
    //id del rol 2=docente
    this.rolservices.getById(3).subscribe((response: any) => {
      this.rol = response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol
    });
  }
  ActualizarEstadouser(usuario: Usuario, idUsuario: any) {
    
    this.usuarioService.updateUsuariorol(usuario, idUsuario, true).subscribe(
      (data: any) => {
        
        Swal.fire('¡Éxito!', 'El usuario fue activado correctamente', 'success'); // SweetAlert al editar el área
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    if (this.validarAdminExist === 2){
      Swal.fire('¡Alerta!', this.persona.nombre+' ya tiene cuenta de ADMINISTRADOR', 'info'); // SweetAlert 
    }else{
      if (this.validardatos === 1) {
        this.usuario.rol = this.rol
        this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 
        this.usuario.enabled = true;
        this.usuario.id_usuario = 0;
        this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
          
          Swal.fire('¡Éxito!', 'Registro del usuario existoso', 'success');
        }, error => {
        });
      } else {
        this.personaService.crearPersona(this.persona).subscribe((response: any) => {
          
          this.usuario.persona = response;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 
          this.usuario.rol = this.rol;
          this.usuario.enabled = true;
          this.usuario.id_usuario = 0;
          
          this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
            
            Swal.fire('¡Éxito!', 'Registro del usuario existoso', 'success');
          }, error => {
          });
        });
      }
    }
    
  }
}