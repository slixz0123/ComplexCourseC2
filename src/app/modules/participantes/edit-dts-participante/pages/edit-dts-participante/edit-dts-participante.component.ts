import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dts-participante',
  templateUrl: './edit-dts-participante.component.html',
  styleUrls: ['./edit-dts-participante.component.css']
})
export class EditDtsParticipanteComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  personai: Persona = new Persona; // instancia de la clase persona 
  id_persona: any;
  constructor(
    private personaService: PersonaService

  ) {

  }
  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
    console.log("Iniciado")
  }

  onSubmit() {
    this.id_persona = (this.persona.id_persona);
    console.log("esta es " + this.id_persona);
    console.log(this.persona)
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      text: '¿Desea editar su perfil?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.updatePersona(this.persona, this.id_persona).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'Su perfil se actualizo correctamente.', 'success');
          },
          (err) => {
            console.log(err);
            Swal.fire('¡Error!', 'Ha ocurrido un error al editar su perfil. Por favor, inténtelo de nuevo más tarde.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }

  public mostrarDatos() {
    this.personaService.getPorId(this.id_persona).subscribe(
      (datai: any) => {
        this.persona = datai;
        console.log(this.persona)
      },
      (err) => {
        console.log(err);
        Swal.fire('¡Error!', 'Ha ocurrido un error al mostrar los datos de su perfil. Por favor, inténtelo de nuevo más tarde.', 'error');
      }
    );
  }

}
