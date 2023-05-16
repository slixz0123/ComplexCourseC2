import { Component, OnInit } from '@angular/core';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { RolServService } from 'src/app/shared/Services/rol-serv.service';
import * as bootstrap from 'bootstrap';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-list-admins',
  templateUrl: './edit-list-admins.component.html',
  styleUrls: ['./edit-list-admins.component.css'],
})
export class EditListAdminsComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUsuario?: Usuario;

  constructor(
    private usuarioService: UsuarioServService,
    private registerUsrService: PersonaServService,
    private rolservices: RolServService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  get adminUsuarios() {
    return this.usuarios.filter(
      (usuario) => usuario.rol?.rolNombre === 'Admin' && usuario.enabled
    );
  }

  
  editUsuario(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    
    // Llena los campos del formulario con los valores actuales del usuario seleccionado
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
  
    if (nombreInput && apellidoInput && emailInput && usernameInput) {
      nombreInput.value = usuario.persona?.nombre || '';
      apellidoInput.value = usuario.persona?.apellido || '';
      emailInput.value = usuario.persona?.email || '';
      usernameInput.value = usuario.username || '';
    }
  
    const editModalElement = document.getElementById('editModal');
    if (editModalElement) {
      const editModal = new bootstrap.Modal(editModalElement);
      editModal.show();
    }
  }

  async saveChanges() {
    if (!this.selectedUsuario || !this.selectedUsuario.persona) {
      console.error('selectedUsuario o selectedUsuario.persona no están definidos');
      return;
    }
  
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
  
    const updatedUsuario: Usuario = {
      ...this.selectedUsuario,
      persona: {
        ...this.selectedUsuario.persona,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
      },
      username: usernameInput.value,
    };
  
    const updateData = async () => {
      try {
        if (updatedUsuario.persona && updatedUsuario.persona.id_persona) {
          await this.registerUsrService.updatePersona(updatedUsuario.persona, updatedUsuario.persona.id_persona).toPromise();
        } else {
          console.error('updatedUsuario.persona o updatedUsuario.persona.id_persona no están definidos');
          return;
        }
  
        await this.usuarioService.updateUsuario(updatedUsuario, updatedUsuario.id_usuario).toPromise();
  
        const selectedIndex = this.usuarios.findIndex(usuario => usuario.id_usuario === this.selectedUsuario?.id_usuario);
  
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
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateData();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos actualizados correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  

  async desactivarUsuario(idRol: number, idUsuario: number, usuario: Usuario) {
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
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deactivateUser();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  
  
}
