import { Component, OnInit } from '@angular/core';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';
import { Usuario } from 'src/app/Core/models/usuario';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { RolServService } from 'src/app/shared/Services/rol-serv.service';
import * as bootstrap from 'bootstrap';
import { ChangeDetectorRef } from '@angular/core';

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
  
    try {
      if (updatedUsuario.persona && updatedUsuario.persona.id_persona) {
        await this.registerUsrService.updatePersona(updatedUsuario.persona, updatedUsuario.persona.id_persona).toPromise();
      } else {
        console.error('updatedUsuario.persona o updatedUsuario.persona.id_persona no están definidos');
        return;
      }
  
      await this.usuarioService.updateUsuario(updatedUsuario, updatedUsuario.id_usuario).toPromise();
  
      // Encuentra el índice del usuario seleccionado en el arreglo 'usuarios'
      const selectedIndex = this.usuarios.findIndex(usuario => usuario.id_usuario === this.selectedUsuario?.id_usuario);
  
      if (selectedIndex !== -1) {
        // Reemplaza el objeto de usuario en el índice encontrado con el objeto de usuario actualizado
        this.usuarios[selectedIndex] = updatedUsuario;
      }
  
      const editModalElement = document.getElementById('editModal');
      if (editModalElement) {
        const editModal = bootstrap.Modal.getInstance(editModalElement);
        if (editModal) {
          editModal.hide();
  
          // Actualiza la lista de usuarios en la tabla
          this.ngOnInit();
        }
      }
    } catch (error) {
      console.error('Error al actualizar el usuario y persona:', error);
    }
  }

  async desactivarUsuario(idRol: number, idUsuario: number, usuario: Usuario) {
    try {
      // Asumiendo que tienes un método updateUsuario en tu servicio usuarioService
      usuario.enabled = false;
      await this.usuarioService.updateUsuario(usuario, idUsuario).toPromise();
  
      // Encuentra el índice del usuario en el arreglo 'usuarios'
      const selectedIndex = this.usuarios.findIndex(
        (usr) => usr.id_usuario === idUsuario
      );
  
      if (selectedIndex !== -1) {
        // Reemplaza el objeto de usuario en el índice encontrado con el objeto de usuario actualizado
        this.usuarios[selectedIndex] = usuario;
      }
  
      this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
  
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
    }
  }
  
  
  
/*
  eliminar(rolId: number, usuarioId: number, usuario: Usuario): void {
    if (usuario.persona && usuario.persona.id_persona && usuario.id_usuario) {
      usuario.persona.enabled = false;
      this.registerUsrService
        .deletepersona(usuario.persona.id_persona, usuario.persona)
        .subscribe(
          (response) => {
            console.log('Persona actualizada:', response);
            // Aquí puedes actualizar la lista de personas en la vista, si es necesario
          },
          (error) => {
            console.error('Error al actualizar persona:', error);
          }
        );
    } else {
      console.error('Error: id_persona no está definido.');
    }

    usuario.enabled = false;
    this.usuarioService.deleteusuario(usuarioId, usuario).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        // Aquí puedes actualizar la lista de usuarios en la vista, si es necesario
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }
  */
}
