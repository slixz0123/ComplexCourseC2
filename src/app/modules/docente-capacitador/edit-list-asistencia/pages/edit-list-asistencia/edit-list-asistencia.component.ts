import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Participante } from 'src/app/Core/models/participante';
import { AsistenciaService } from 'src/app/shared/Services/asistencia.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-list-asistencia',
  templateUrl: './edit-list-asistencia.component.html',
  styleUrls: ['./edit-list-asistencia.component.css']
})
export class EditListAsistenciaComponent {

  participantes: { participante: Participante, asistencia: Asistencia }[] = [];
  formularioAsistencia!: FormGroup;
  asistencias: Asistencia[] = [];

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;

  participanteSeleccionado: Participante | null = null;
  asistenciaSeleccionada: Asistencia = new Asistencia;
  mostrarEditarFaltas = false;
  valorMaximo!: number;

  constructor(private formBuilder: FormBuilder, private asistenciaServ: AsistenciaService, private participanteServ: ParticipanteService) { }

  ngOnInit(): void {
    this.obtenerParticipantes();
    this.obtenerAsistencias();
    this.valorMaximo = this.asistenciaSeleccionada.asiNumfaltas; // Almacenar el valor máximo inicial

  }

  obtenerParticipantes(): void {
    const curId = 1; // Aquí debes colocar el ID del curso que deseas obtener
    this.participanteServ.obtenerParticipantesPorCurso(curId).subscribe(participantes => {
      this.participantes = participantes.map(participante => ({
        participante: participante,
        asistencia: new Asistencia()
      }));
    });
  }

  obtenerAsistencias(): void {
    this.participantes.forEach(item => {
      this.asistenciaServ.obtenerAsistenciasPorParticipante(item.participante.parId).subscribe(asistencias => {
        if (asistencias.length > 0) {
          item.asistencia = asistencias[0];
        }
      });
    });
  }

  mostrarAsistencias(parId: number): void {
    this.asistenciaServ.obtenerAsistenciasPorParticipante(parId).subscribe(asistencias => {
      this.asistencias = asistencias;
      this.showContainer1 = false;
      this.showContainer2 = true;
    });
  }

  mostrarDetalles(item: { participante: Participante, asistencia: Asistencia }): void {
    // Aquí puedes asignar los datos de la fila seleccionada a las variables correspondientes
    this.participanteSeleccionado = item.participante;
    this.asistenciaSeleccionada = item.asistencia;
    // Mostrar el componente para editar el número de faltas
    this.mostrarEditarFaltas = true;
  }


  editarNumFaltas(newValue: number) {
    this.asistenciaSeleccionada.asiNumfaltas = newValue;
  }
  mostrarAsistenciaEnEdicion(asistencia: Asistencia) {
    this.asistenciaSeleccionada = asistencia;
    this.valorMaximo = asistencia.asiNumfaltas; // Asignar el valor inicial a valorMaximo
    this.showContainer1 = false;
    this.showContainer2 = false;
    this.showContainer3 = true;
  }

  guardarCambios(): void {
    if (this.asistenciaSeleccionada) {
      const valorInicialFaltas = this.asistenciaSeleccionada.asiNumfaltas; // Guardar el valor inicial
  
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar este registro de asistencia?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar la actualización
          this.asistenciaServ.updateAsistencia(this.asistenciaSeleccionada, this.asistenciaSeleccionada.asiId)
            .subscribe(
              (response) => {
                // Lógica de éxito en la actualización
                Swal.fire('Asistencia modificada', 'El registro ha sido modificado correctamente', 'success');
                // Resto del código para manejar el éxito en la actualización
                this.showContainer1 = false;
                this.showContainer2 = true;
                this.showContainer3 = false;
              },
              (error) => {
                // Lógica de error en la actualización
                console.error('Error al actualizar la asistencia:', error);
                // Resto del código para manejar el error en la actualización
              }
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Cancelar la edición
          Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
          this.asistenciaSeleccionada.asiNumfaltas = valorInicialFaltas; // Revertir el número de faltas al valor inicial
                this.showContainer1 = true;
                this.showContainer2 = false;
                this.showContainer3 = false;
        }
      });
    }
  }
  
  
  
  

  validarHorasFalta() {
    const valorIngresado = this.asistenciaSeleccionada.asiNumfaltas;

    if (valorIngresado < 0) {
      this.asistenciaSeleccionada.asiNumfaltas = 0;
    } else if (valorIngresado > this.valorMaximo) {
      this.asistenciaSeleccionada.asiNumfaltas = this.valorMaximo;
    }
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }


}
