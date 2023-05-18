import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Participante } from 'src/app/Core/models/participante';
import { AsistenciaService } from 'src/app/shared/Services/asistencia.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-asistencia',
  templateUrl: './register-asistencia.component.html',
  styleUrls: ['./register-asistencia.component.css']
})
export class RegisterAsistenciaComponent {

  participantes: { participante: Participante, asistencia: Asistencia }[] = [];
  formularioAsistencia!: FormGroup;


  constructor(private formBuilder: FormBuilder, private asistenciaServ: AsistenciaService, private participanteServ: ParticipanteService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerParticipantes();
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


registrarAsistencias() {
  if (this.formularioAsistencia.valid) {
    const asistencias: Asistencia[] = this.participantes.map(item => {
      const numFaltas = item.asistencia.asiNumfaltas;

      const asistencia: Asistencia = {
        asiId: 0,
        asiNumfaltas: numFaltas,
        asiFecha: new Date(),
        asiEstado: true,
        asiParticipante: item.participante
      };

      return asistencia;
    });

    const observables = asistencias.map(asistencia => this.asistenciaServ.saveAsistencia(asistencia));
    forkJoin(observables).subscribe(
      respuestas => {
        // Mostrar SweetAlert de éxito
        Swal.fire('Éxito', 'Las asistencias han sido guardadas correctamente', 'success');
        
        // Restablecer el valor del componente input a 0
        this.participantes.forEach(item => {
          item.asistencia.asiNumfaltas = 0;
        });
      },
      error => {
        // Mostrar SweetAlert de error
        Swal.fire('Error', 'Ocurrió un error al guardar las asistencias', 'error');
        console.error(error);
      }
    );
  }
}

  

  
  
  
  
  inicializarFormulario() {
    this.formularioAsistencia = this.formBuilder.group({});
  
    this.participantes.forEach(item => {
      const controlFaltas = this.formBuilder.control(null, Validators.required);
      const participanteId = item.participante.parId;
      this.formularioAsistencia.addControl(`faltas${participanteId}`, controlFaltas);
    });
  }
  
}
