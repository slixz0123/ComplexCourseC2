import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Curso } from 'src/app/Core/models/curso';
import { EntregaCertificado } from 'src/app/Core/models/entregaCertificado';
import { Horario } from 'src/app/Core/models/horario';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { EntregaCertificadoService } from 'src/app/shared/Services/entegaCertificado.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrega-certificados',
  templateUrl: './entrega-certificados.component.html',
  styleUrls: ['./entrega-certificados.component.css']
})
export class EntregaCertificadosComponent {

  certificadoSeleccionado: EntregaCertificado = new EntregaCertificado();
  participantes: { participante: Participante, certificado: EntregaCertificado }[] = [];
  formularioCertificados!: FormGroup;
  curso: Curso = new Curso; // instancia de la clase asistencia curso
  idPersona: any;
  estado: boolean = true;
  cursosList: any[] = [];
  participantesList: Participante[] = [];
  certificadosList: EntregaCertificado[] = [];
  certificados: EntregaCertificado[] = [];
  horariosCur: HorarioCurso[] = [];
  horarioCurSeleccionado: HorarioCurso = new HorarioCurso();
  horarios: Horario[] = [];

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;
  selectedCursoId!: number;
  selectedHorarioId!: number;
  selectedEstudianteId!: number;

  editando: boolean = false;
  isNew: boolean = true;
  certificadoForm: FormGroup | undefined;
  submitted = false;
  eceCodigoValido: boolean = true;
  eceFechaValido: boolean = true;

  constructor(private certificadoServ: EntregaCertificadoService, private cursoService: CursoService, private formBuilder: FormBuilder, private participanteServ: ParticipanteService, private horarioCurService: HorarioCursoService) { }

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

          this.participantesList = participantes.filter((participante: Participante) => participante.parEstadoaprovacion == 'Aprobado');
          this.participantes = participantes.map(participante => ({
            participante: participante,
            certificado: new EntregaCertificado()
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
    this.showContainer4 = false;
    this.getHorariosByCurso(this.selectedCursoId);
  }

  selectHorariosCurso(hcuId: number): void {
    this.selectedHorarioId = hcuId;
    this.showContainer1 = false;
    this.showContainer2 = false;
    this.showContainer3 = true;
    this.showContainer4 = false;
    this.obtenerParticipantes();
  }

  selectEstudiantes(parId: number): void {
    this.selectedEstudianteId = parId;
    this.showContainer1 = false;
    this.showContainer2 = false;
    this.showContainer3 = false;
    this.showContainer4 = true;
    this.getCertificado(this.selectedEstudianteId);
  }

  registrarCertificados() {
    // Obtener las fechas del formulario
    const fecha = new Date(this.certificadoSeleccionado.eceFecharetiro);

    // Convertir las fechas a formato UTC
    const fechaInicioUTC = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate());

    // Asignar las fechas UTC al objeto cursoSeleccionado
    this.certificadoSeleccionado.eceFecharetiro = fechaInicioUTC;

    if (this.formularioCertificados.valid) {
      const certificados: EntregaCertificado[] = this.participantes.map(item => {
        const codigo = item.certificado.eceCodigocertificado;

        const certificado: EntregaCertificado = {
          eceId: 0,
          eceCodigocertificado: codigo,
          eceFecharetiro: new Date(),
          eceFirma: false,
          eceEstado: true,
          eceParticipante: item.participante
        };

        return certificado;
      });

      const observables = certificados.map(certificado => this.certificadoServ.crear(certificado));
      forkJoin(observables).subscribe(
        respuestas => {
          // Mostrar SweetAlert de éxito
          Swal.fire('Éxito', 'El certifcado han sido guardado correctamente', 'success');

          // Restablecer el valor del componente input a 0
          this.participantes.forEach(item => {
            item.certificado.eceCodigocertificado = '';
          });
        },
        error => {
          // Mostrar SweetAlert de error
          Swal.fire('Error', 'Ocurrió un error al guardar los códigos', 'error');
          console.error(error);
        }
      );
    }
  }

  inicializarFormulario() {
    this.formularioCertificados = this.formBuilder.group({});

    this.participantes.forEach(item => {
      const controlFaltas = this.formBuilder.control(null, Validators.required);
      const participanteId = item.participante.parId;
      this.formularioCertificados.addControl(`certificado${participanteId}`, controlFaltas);
    });
  }

  opcionesFirma = [
    { valor: false, etiqueta: 'Sin Firmar' },
    { valor: true, etiqueta: 'Firmado' }
  ];


  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter((curso: Curso) => curso.curProceso !== 'Finalizado');
    });
  }

  getCertificado(parId: number): void {
    this.selectedEstudianteId = parId;
    this.certificadoServ.obtenerCertificadosPorParticipante(parId)
      .subscribe(certificados => {
        this.certificados = certificados;
        this.certificados = this.certificados.filter((cert: EntregaCertificado) => cert.eceEstado === true);

      });
  }

  crearCertificado(): void {
    this.certificadoSeleccionado.eceParticipante.parId = this.selectedEstudianteId
    this.certificadoServ.crear(this.certificadoSeleccionado).subscribe(() => {
      this.getCertificado(this.selectedEstudianteId);
      this.certificadoSeleccionado = new EntregaCertificado();
      Swal.fire('¡Éxito!', 'El certificado ha sido registrado correctamente', 'success');
    });
  }

  editarCertificado(certi: EntregaCertificado): void {
    this.certificadoSeleccionado = JSON.parse(JSON.stringify(certi));
    this.editando = true;
    this.isNew = false;
  }

  guardarCertificado(): void {
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.certificadoSeleccionado.eceParticipante.parId = this.selectedEstudianteId
        this.certificadoServ.actualizarEntregaCertificado(this.certificadoSeleccionado, this.certificadoSeleccionado.eceId).subscribe(() => {
          this.getCertificado(this.selectedEstudianteId);
          this.certificadoSeleccionado = new EntregaCertificado();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El certificado ha sido modificadao correctamente', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.certificadoSeleccionado = new EntregaCertificado();
        this.editando = false;
        this.isNew = true;
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }

  seleccionarCertificado(certif: EntregaCertificado): void {
    this.certificadoSeleccionado = Object.assign({}, certif);
  }

  eliminarCertificado(eceId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.certificadoServ.eliminar(eceId).subscribe(
          () => {
            this.getCertificado(this.selectedEstudianteId);
            Swal.fire('¡Éxito!', 'El certificado ha sido eliminado correctamente', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Ocurrió un error al eliminar el certificado', 'error');
            console.error(error);
          }
        );
      }
    });
  }


  submitForm(): void {
    this.submitted = true;
    if (this.certificadoForm && this.certificadoForm.invalid) {
      return;
    }

    const codigoRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.eceCodigoValido = codigoRegex.test(this.certificadoSeleccionado.eceCodigocertificado);

    if (this.eceCodigoValido) {
      if (this.isNew) {
        this.crearCertificado();
      } else {
        this.guardarCertificado();
      }
      this.certificadoForm?.reset();
      this.submitted = false;
      this.isNew = true;
    } else {
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }
  }
}
