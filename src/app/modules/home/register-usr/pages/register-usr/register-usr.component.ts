import { Component } from '@angular/core';
import { SignupRequest } from 'src/app/Core/models/SingUpRequest';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';
import { CargarjsHomeService } from '../../../services/cargarjs-home.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-usr',
  templateUrl: './register-usr.component.html',
  styleUrls: ['./register-usr.component.css']
})
export class RegisterUsrComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  usuario: Usuario = new Usuario; // instancia de la clase usuario  
  rol: Rol = new Rol; // instancia de la clase rol 
  idPersona: any;
  // en el constructor instanciamos los servicios
  constructor(private persoUsrService: PersonaService, private userServiceService: UsuarioService, private rolservices:RolService,_cargrasjs:CargarjsHomeService) {
    _cargrasjs.carga_jquery(['pass'])

    const currentDate = new Date();
    const minAge = 15;
    currentDate.setFullYear(currentDate.getFullYear() - minAge);
    this.maxDate = currentDate.toISOString().split('T')[0];
   }
   signupRequest: SignupRequest = {
    persona: {
      id_persona: 0,
      cedula: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: new Date(),
      email: '',
      direccion: '',
      sexo: '',
      etnia: '',
      telefono: '',
      celular: '',
      nivelintruccion: '',
      hojavida: '',
      enabled: true,
      persona:Persona,
      rol:Rol
    },
    username: '',
    password: '',
    enable: true,
    roles: ''
  };
  ngOnInit() {
    this.obtenerRol();
    // this.ValidarRole();
    this.idPersona = localStorage.getItem('id_persona')
    console.log(this.idPersona)
  }

  obtenerRol() {
    //id del rol 1=participante
    this.rolservices.getById(1).subscribe((response: any) => {
      console.log("mi rol")
      console.log(response); // Imprime la respuesta de la API en la consola
      this.rol = response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol
    });
  }

  maxDate: string='';
  validardatos: any;
  onSignup(): void {
    if (!this.validateForm()) {
      Swal.fire('Formulario no válido', 'Por favor revise el formulario e intente nuevamente', 'error');
      return;
    }
  
    this.signupRequest.roles = "ROLE_PARTICIPANTE";
    this.signupRequest.enable = true;
  
    this.userServiceService.getUserByUsername(this.signupRequest.username).subscribe(
      (existingUser: Usuario) => {
        if (existingUser) {
          Swal.fire('Usuario existente', 'El nombre de usuario ya está en uso', 'error');
        } else {
          this.persoUsrService.getPersonaCedula(this.signupRequest.persona.cedula).subscribe(
            (existingPersona: Persona) => {
              if (existingPersona) {
                this.checkPersonaHasUser(existingPersona.id_persona);
              } else {
                this.persoUsrService.crearPersona(this.signupRequest.persona).subscribe(
                  (createdPersona: Persona) => {
                    this.signupRequest.persona = createdPersona;
                    this.registerUser();
                  },
                  err => {
                    console.log(err);
                    Swal.fire('Error de registro', 'Hubo un problema al crear la persona', 'error');
                  }
                );
              }
            },
            err => {
              console.log(err);
              Swal.fire('Error de registro', 'Hubo un problema al obtener la información de la persona', 'error');
            }
          );
        }
      },
      err => {
        console.log(err);
        Swal.fire('Error de registro', 'Hubo un problema al verificar el nombre de usuario', 'error');
      }
    );
  }
  
  
  checkPersonaHasUser(personaId: number): void {
    this.userServiceService.checkPersonaHasUser(personaId).subscribe(
      (existingUsers: Usuario[] | Usuario) => {
        const usersArray = Array.isArray(existingUsers) ? existingUsers : [existingUsers];
        const participanteUser = usersArray.filter(user => user.rol?.rolNombre === 'ROLE_PARTICIPANTE');
  
        if (participanteUser.length > 0) {
          Swal.fire('Usuario existente', 'Esta persona ya tiene un usuario registrado como participante', 'error');
        } else {
          this.registerUser();
        }
      },
      (err: any) => {
        console.log(err);
        Swal.fire('Error de registro', 'Esta persona ya tiene un usuario registrado como participante y docente', 'error');
      }
    );
  }
  
  
  
  
  
  
  
  
  registerUser(): void {
    this.persoUsrService.getPersonaCedula(this.signupRequest.persona.cedula).subscribe(
      (existingPersona: Persona) => {
        if (existingPersona) {
          this.signupRequest.persona.id_persona = existingPersona.id_persona;
          this.userServiceService.registerUser(this.signupRequest).subscribe(
            data => {
              console.log(data);
              Swal.fire('Registro exitoso', 'El usuario se registró correctamente', 'success');
            },
            error => {
              console.log(error);
              Swal.fire('Error de registro', 'Hubo un problema al registrar el usuario', 'error');
            }
          );
        } else {
          this.persoUsrService.crearPersona(this.signupRequest.persona).subscribe(
            (createdPersona: Persona) => {
              this.signupRequest.persona = createdPersona;
              this.userServiceService.registerUser(this.signupRequest).subscribe(
                data => {
                  console.log(data);
                  Swal.fire('Registro exitoso', 'El usuario se registró correctamente', 'success');
                },
                error => {
                  console.log(error);
                  Swal.fire('Error de registro', 'Hubo un problema al registrar el usuario', 'error');
                }
              );
            },
            err => {
              console.log(err);
              Swal.fire('Error de registro', 'Hubo un problema al crear la persona', 'error');
            }
          );
        }
      },
      err => {
        console.log(err);
        Swal.fire('Error de registro', 'Hubo un problema al obtener la información de la persona', 'error');
      }
    );
  }
  
  
  
  
  
  validateForm(): boolean {
    // Aquí puedes agregar más validaciones si es necesario
    return true;
  }

  rellenarFormulario() {
    this.signupRequest.persona.nombre = this.persona.nombre as string;
    this.signupRequest.persona.apellido = this.persona.apellido as string;;
    this.signupRequest.persona.fecha_nacimiento = this.persona.fecha_nacimiento;
    this.signupRequest.persona.email = this.persona.email as string;
    this.signupRequest.persona.direccion = this.persona.direccion as string;;
    this.signupRequest.persona.sexo = this.persona.sexo as string;
    this.signupRequest.persona.telefono = this.persona.telefono as string;
    this.signupRequest.persona.celular = this.persona.celular as string;;
    this.signupRequest.persona.etnia = this.persona.etnia as string;
    this.signupRequest.persona.nivelintruccion = this.persona.nivelintruccion as string;
    // No olvides configurar cualquier otro campo que necesites.
}
Formulario() {
  this.signupRequest.persona.nombre = ''
  this.signupRequest.persona.apellido = ''
  this.signupRequest.persona.fecha_nacimiento = this.persona.fecha_nacimiento;
  this.signupRequest.persona.email = ''
  this.signupRequest.persona.direccion = ''
  this.signupRequest.persona.sexo =''
  this.signupRequest.persona.telefono = ''
  this.signupRequest.persona.celular =''
  this.signupRequest.persona.etnia =''
  this.signupRequest.persona.nivelintruccion =''
  // No olvides configurar cualquier otro campo que necesites.
}

onCedulaChange(value: string): void {
  if (value.length === 10) {
    this.buscarPersona(value);
  }
}


  buscarPersona(cedula: any) {
    this.persoUsrService.getPersonaCedula(cedula).subscribe((data: any) => {
      if (null != data) {
        this.persona = data;
        this.ValidarRole(this.persona.id_persona);
      } else {
        Swal.fire('¡Alerta!', 'Persona no encontrada, Ingrese todos los datos', 'info'); // SweetAlert al editar el área
        this.validardatos = 2;
        this.persona.id_persona = 0;
        this.persona.cedula = cedula;
        this.persona.nombre = " ";
        this.persona.apellido = " ";
        this.persona.fecha_nacimiento = new Date('2000-01-01');
        this.persona.email = " ";
        this.persona.direccion = " ";
        this.persona.sexo = " ";
        this.persona.telefono = " ";
        this.persona.celular = " ";
        this.persona.etnia = " ";
        this.persona.nivelintruccion = " ";
        this.persona.hojavida = " ";
        this.persona.enabled = true;
      }
    });
  }


  ValidarRole(idPersona: any) {
    // Verifica primero el rol de docente
    this.userServiceService.getpersonarol(idPersona, 2).subscribe((response: any) => {
      console.log(response);
      if (response != null) {
        // Si la persona tiene el rol de docente, verifica el rol de participante
        this.userServiceService.getpersonarol(idPersona, 1).subscribe((participanteResponse: any) => {
          console.log(participanteResponse);
          if (participanteResponse != null) {
            Swal.fire('¡Alerta!', 'La persona ya tiene una cuenta de Participante', 'info');
          } else {
            // La persona tiene el rol de docente y no tiene el rol de participante
            // Aquí puedes continuar con la lógica de tu programa
            this.rellenarFormulario();
          }
        });
      } else {
        Swal.fire('¡Alerta!', 'La persona no tiene cuenta de Docente asi que cargar', 'info');
      }
    });
  }
  

  ActualizarEstadouser(usuario: Usuario, idUsuario: any) {
    console.log("datos actualizados")
    this.userServiceService.updateUsuariorol(usuario, idUsuario, true).subscribe(
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





}
