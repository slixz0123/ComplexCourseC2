import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Participante } from 'src/app/Core/models/participante';
import { AsistenciaService } from 'src/app/shared/Services/asistencia.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Curso } from 'src/app/Core/models/curso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { Horario } from 'src/app/Core/models/horario';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';

@Component({
  selector: 'app-register-asistencia',
  templateUrl: './register-asistencia.component.html',
  styleUrls: ['./register-asistencia.component.css']
})
export class RegisterAsistenciaComponent {

  asistenciaSeleccionada: Asistencia = new Asistencia();
  participantes: { participante: Participante, asistencia: Asistencia }[] = [];
  formularioAsistencia!: FormGroup;
  curso: Curso = new Curso; // instancia de la clase asistencia curso
  idPersona: any;
  estado: boolean = true;
  cursosList: any[] = [];
  horariosCur: HorarioCurso[] = [];
  horarioCurSeleccionado: HorarioCurso = new HorarioCurso();
  horarios: Horario[] = [];

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  selectedCursoId!: number;
  selectedHorarioId!: number;

  constructor(private cursoService: CursoService, private formBuilder: FormBuilder, private asistenciaServ: AsistenciaService, private participanteServ: ParticipanteService, private horarioCurService: HorarioCursoService) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
    this.inicializarFormulario();
  }

  obtenerParticipantes(): void {
    this.horarioCurSeleccionado.hcurso.curId = this.selectedCursoId;
    if (this.selectedCursoId) {
      this.participanteServ.ParticipantesPorhorarioc(this.selectedCursoId, this.selectedHorarioId)
        .subscribe(participantes => {
          this.participantes = participantes.map(participante => ({
            participante: participante,
            asistencia: new Asistencia()
          }));
        });
    }
  }

  getHorariosByCurso(idCurso: number): void {
    this.horarioCurSeleccionado.hcurso.curId = idCurso;
    idCurso = this.selectedCursoId;
    this.horarioCurService.getAllHorariosByCurso(idCurso).subscribe(
      horarios => {
        this.horariosCur = horarios.filter((horarioCur: HorarioCurso) => horarioCur.hcuEstado === true);
      }
    );
  }

  selectCurso(cursoId: number): void {
    this.selectedCursoId = cursoId;
    this.showContainer1 = false;
    this.showContainer2 = true;
    this.showContainer3 = false;
    this.getHorariosByCurso(this.selectedCursoId);
  }

  selectHorariosCurso(hcuId: number): void {
    this.selectedHorarioId = hcuId;
    this.showContainer1 = false;
    this.showContainer2 = false;
    this.showContainer3 = true;
    this.obtenerParticipantes();
  }

  registrarAsistencias() {
    // Obtener las fechas del formulario
    const fechaInicio = new Date(this.asistenciaSeleccionada.asiFecha);

    // Convertir las fechas a formato UTC
    const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());

    // Asignar las fechas UTC al objeto cursoSeleccionado
    this.asistenciaSeleccionada.asiFecha = fechaInicioUTC;
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

  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter((curso: Curso) => curso.curProceso !== 'Finalizado');
    });
  }

}
