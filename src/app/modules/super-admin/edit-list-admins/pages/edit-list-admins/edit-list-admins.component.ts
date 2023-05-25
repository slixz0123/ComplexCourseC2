import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Core/models/usuario';
import * as bootstrap from 'bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';

@Component({
  selector: 'app-edit-list-admins',
  templateUrl: './edit-list-admins.component.html',
  styleUrls: ['./edit-list-admins.component.css'],
})
export class EditListAdminsComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUsuario?: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private registerUsrService: PersonaService,
    private rolservices: RolService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuariosAdmin().subscribe((usuarioList) => {
      this.usuarios = usuarioList;
    });
  }

  get adminUsuarios() {
    return this.usuarios;
  }

  editUsuario(usuario: Usuario): void {
    this.selectedUsuario = usuario;

    // Llena los campos del formulario con los valores actuales del usuario seleccionado
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidoInput = document.getElementById(
      'apellido'
    ) as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const usernameInput = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;

    if (nombreInput && apellidoInput && emailInput && usernameInput) {
      nombreInput.value = usuario.persona?.nombre || '';
      apellidoInput.value = usuario.persona?.apellido || '';
      emailInput.value = usuario.persona?.email || '';
      usernameInput.value = usuario.username || '';
      passwordInput.value = usuario.password || '';
    }

    const editModalElement = document.getElementById('editModal');
    if (editModalElement) {
      const editModal = new bootstrap.Modal(editModalElement);
      editModal.show();
    }
  }

  async saveChanges() {
    if (!this.selectedUsuario || !this.selectedUsuario.persona) {
      console.error(
        'selectedUsuario o selectedUsuario.persona no están definidos'
      );
      return;
    }

    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidoInput = document.getElementById(
      'apellido'
    ) as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const usernameInput = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;

    const updatedUsuario: Usuario = {
      ...this.selectedUsuario,
      persona: {
        ...this.selectedUsuario.persona,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
      },
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const updateData = async () => {
      try {
        if (updatedUsuario.persona && updatedUsuario.persona.id_persona) {
          await this.registerUsrService
            .updatePersona(
              updatedUsuario.persona,
              updatedUsuario.persona.id_persona
            )
            .toPromise();
        } else {
          console.error(
            'updatedUsuario.persona o updatedUsuario.persona.id_persona no están definidos'
          );
          return;
        }

        await this.usuarioService
          .updateUsuario(updatedUsuario, updatedUsuario.id_usuario)
          .toPromise();

        const selectedIndex = this.usuarios.findIndex(
          (usuario) => usuario.id_usuario === this.selectedUsuario?.id_usuario
        );

        if (selectedIndex !== -1) {
          this.usuarios[selectedIndex] = updatedUsuario;
        }

        const editModalElement = document.getElementById('editModal');
        if (editModalElement) {
          const editModal = bootstrap.Modal.getInstance(editModalElement);
          if (editModal) {
            editModal.hide();
            this.ngOnInit();
          }
        }
      } catch (error) {
        console.error('Error al actualizar el usuario y persona:', error);
      }
    };

    Swal.fire({
      title: '¿Estás seguro de actualizar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateData();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos actualizados correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  async activarUsuario(idUsuario: number, usuario: Usuario) {
    const activateUser = async () => {
      try {
        usuario.enabled = true;
        await this.usuarioService.updateUsuario(usuario, idUsuario).toPromise();

        const selectedIndex = this.usuarios.findIndex(
          (usr) => usr.id_usuario === idUsuario
        );

        if (selectedIndex !== -1) {
          this.usuarios[selectedIndex] = usuario;
        }

        this.changeDetectorRef.detectChanges();
      } catch (error) {
        console.error('Error al activar el usuario:', error);
      }
    };

    Swal.fire({
      title: '¿Estás seguro de activar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, activar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await activateUser();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario activado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  async desactivarUsuario(idUsuario: number, usuario: Usuario) {
    const deactivateUser = async () => {
      try {
        usuario.enabled = false;
        await this.usuarioService.updateUsuario(usuario, idUsuario).toPromise();

        const selectedIndex = this.usuarios.findIndex(
          (usr) => usr.id_usuario === idUsuario
        );

        if (selectedIndex !== -1) {
          this.usuarios[selectedIndex] = usuario;
        }

        this.changeDetectorRef.detectChanges();
      } catch (error) {
        console.error('Error al desactivar el usuario:', error);
      }
    };

    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deactivateUser();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  searchTerm: string = '';

  filterUsuarios(): Usuario[] {
    if (!this.searchTerm) {
      return this.adminUsuarios;
    }

    const searchTermLowerCase = this.searchTerm.toLowerCase();

    return this.adminUsuarios.filter((usuario) => {
      const cedula = usuario.persona?.cedula || '';
      const nombre = usuario.persona?.nombre || '';
      const apellido = usuario.persona?.apellido || '';

      return (
        cedula.toLowerCase().includes(searchTermLowerCase) ||
        nombre.toLowerCase().includes(searchTermLowerCase) ||
        apellido.toLowerCase().includes(searchTermLowerCase)
      );
    });
  }

  updateSearchTerm(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }
}
