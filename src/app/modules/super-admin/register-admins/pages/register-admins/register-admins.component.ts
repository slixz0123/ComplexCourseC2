import { Component, ElementRef, ViewChild } from '@angular/core';
import { window } from 'rxjs';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-admins',
  templateUrl: './register-admins.component.html',
  styleUrls: ['./register-admins.component.css'],
})
export class RegisterAdminsComponent {
  persona: Persona = new Persona(); // instancia de la clase persona
  usuario: Usuario = new Usuario(); // instancia de la clase usuario
  rol: Rol = new Rol(); // instancia de la clase rol
  

  @ViewChild('successModal', { static: false }) successModalRef!: ElementRef;


  // en el constructor instanciamos los servicios
  constructor(
    private registerUsrService: PersonaService,
    private userServiceService: UsuarioService,
    private rolservices: RolService
  ) {}

  ngOnInit() {}
  
  ngAfterViewInit() {
    
  }

  resetForm() {
    this.persona = {
      cedula: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      sexo: '',
      etnia: '',
      telefono: '',
      celular: '',
      nivelintruccion: '',
    };

    this.usuario = {
      username: '',
      password: '',
      persona: {},
      rol: {},
    };
  }

  onSubmitGuardar() {
    if (
      this.persona && this.usuario &&
      this.persona.nombre && this.persona.apellido &&
      this.persona.email && this.usuario.password && this.persona.etnia
      && this.persona.sexo && this.persona.nivelintruccion
      && this.persona.cedula && this.persona.fecha_nacimiento
    ) {
      Swal.fire({
        title: '¿Estás seguro de guardar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.registerUsrService.postPersona(this.persona).subscribe((response) => {
            console.log(response);
            this.persona.id_persona = response.id_persona;
            this.usuario.persona = this.persona;
  
            this.rolservices.getById(3).subscribe((response) => {
              console.log(response);
              this.rol.id_rol = response.id_rol;
              this.usuario.rol = response;
  
              this.userServiceService
                .postUsuario(this.usuario)
                .subscribe((response) => {
                  console.log(response);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Guardado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.resetForm();
                });
            });
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'EXISTEN CAMPOS VACÍOS',
        text: 'Revise los campos por completar!',
      });
    }
  }
  

}
