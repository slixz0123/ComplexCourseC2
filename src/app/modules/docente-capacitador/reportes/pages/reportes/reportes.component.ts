import { Component } from '@angular/core';
import { InformeFinalService } from 'src/app/shared/Services/informeFinalcurso.service';
import { InformeFinal } from 'src/app/Core/models/InformeFinal';
import { Curso } from 'src/app/Core/models/curso';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';

import { AfterViewInit } from '@angular/core';
import { AsistenciaCurso } from 'src/app/Core/models/asistenciaCurso';
import { AsistenciaCursoService } from 'src/app/shared/Services/asistenciaCurso.service';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { EntregaCertificadoService } from 'src/app/shared/Services/entregaCertificado.service';
import { EntregaCertificado } from 'src/app/Core/models/entregaCertificados';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { AsistenciaService } from 'src/app/shared/Services/asistencia.service';
import { Participante } from 'src/app/Core/models/participante';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosDidacticos';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { RegistroFotografico } from 'src/app/Core/models/registrFotografico';
import { RegistroFotograficoService } from 'src/app/shared/Services/registroFotografico.service';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { HorasaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/horasaprendizajeserv.service';
import { ResultadosaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/resultadosaprendizajeserv.service';
import { ContenidocurservService } from 'src/app/shared/Services/DatosSilaboServ/contenidocurserv.service';
import { EstrategiasmetservService } from 'src/app/shared/Services/DatosSilaboServ/estrategiasmetserv.service';
import { RecursosdidacticosservService } from 'src/app/shared/Services/DatosSilaboServ/recursosdidacticosserv.service';
import { EvaluaepraService } from 'src/app/shared/Services/DatosSilaboServ/evaluaepra.service';
import Swal from 'sweetalert2';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { DetalleMevaService } from 'src/app/shared/Services/detalleMeva.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
  informeFinal: InformeFinal = new InformeFinal(); // instancia de la clase informe finla
  asistenciaCurso: AsistenciaCurso = new AsistenciaCurso(); // instancia de la clase asistencia curso
  curso: Curso = new Curso(); // instancia de la clase asistencia curso
  idPersona: any;
  idCurso: any;
  idInformefinal: any;
  idAsistenciaCurso: any;
  estado: boolean = true;
  participantes: { participante: Participante; asistencia: Asistencia }[] = [];

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;

  constructor(
    private informeFinalServ: InformeFinalService,
    private participanteServ: ParticipanteService,
    private cursoService: CursoService,
    private asistenciaCursoServ: AsistenciaCursoService,
    private silaboServ: DatossilaboservService,
    private entregaCertificadosServ: EntregaCertificadoService,
    private asistenciasServ: AsistenciaService,
    private necesidadCursoServ: NecesidadCursoService,
    private registroFotograficoServ: RegistroFotograficoService,
    private horarioCursoServ: HorarioCursoService,
    private horasAprendizajeServ: HorasaprendizajeservService,
    private resultadosAprendizajeServ: ResultadosaprendizajeservService,
    private contenidosCursoServ: ContenidocurservService,
    private estrategiasMetodologicasServ: EstrategiasmetservService,
    private recursoDidacticoServ: RecursosdidacticosservService,
    private evaluacionEpraServ: EvaluaepraService,
    private detallesMeServ: DetalleMevaService,
    private disenoCurricularServ: DisenoCurricularService,
    private fichaIncripcionService: FichaIncripcionService
  ) { }
  ngOnInit(): void {
    this.AllInformesFinal();
    // this.listarAsistenciasCurso();
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
  }
  capturarcurso(Cursos: any) {
    this.curso = Cursos;
    this.idCurso = this.curso.curId
    console.log("id del curso");

    console.log(this.idCurso)
  }
  valinforme: any
  informeFinaln: InformeFinal = new InformeFinal(); // instancia de la clase informe finla
  idInforme: any;
  obtenerinformefianal() {
    this.informeFinalServ.getInformefinalBycurso(this.idCurso).subscribe((data: any) => {
      if (null != data) {
        this.informeFinal = data;
        this.idInforme = this.informeFinal.ifiId;
        this.valinforme = false;
        Swal.fire('¡Alerta!', 'Ya existe un informe final del curso, puede solo editarlo', 'info'); // SweetAlert al editar el área
      } else {
        Swal.fire('¡Alerta!', 'No existe un informe final del curso, puede crarlo si lo desea', 'info'); // SweetAlert al editar el área
        this.informeFinal = this.informeFinaln;
        this.informeFinal.ifiCurso = this.curso;
        this.informeFinal.ifiObservaciones = " ";
        this.informeFinal.ifiId = 0;
        this.valinforme = true;
      }
    });
  }

  guardarIdCurso(curId: any){
    this.idCurso = curId;
  }
  editarInformefinal(informefinal: any) {
    console.log(this.informeFinal.ifiFecha);
    const fechai = new Date(informefinal.ifiFecha);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    informefinal.ifiFecha = fechaFormateadai;
    this.informeFinal = informefinal;
  }
  asistenciasCursolList: any[] = [];
  public listarAsistenciasCurso() {
    this.asistenciaCursoServ.getAllAsisteciasCursos().subscribe((data: any) => {
      this.asistenciasCursolList = data;
    });
  }
  mostrardatosf() {
    this.informeFinalServ.getInformefinalBycurso(this.idCurso).subscribe((data: any) => {
      this.informeFinal = data;
      this.idInforme = this.informeFinal.ifiId;
    });
  }
  mostrardatosa() {
    this.asistenciaCursoServ.getasistenciacbycurso(this.idCurso).subscribe((data: any) => {
      this.asistenciaCurso = data;
      this.idAsistencia = this.asistenciaCurso.acuId;
    });
  }
  observacion: boolean = true;
  saveInformefinal() {
    const observacionRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.observacion = observacionRegex.test(this.informeFinal.ifiObservaciones);
    if (this.observacion) {
      if (this.valinforme != false) {
        this.informeFinal.ifiCurso = this.curso;
        this.informeFinal.ifiEstado = this.estado;
        this.informeFinalServ.saveInformefinal(this.informeFinal).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'El informe se guardo correctamente', 'success');
            this.informeFinal=data;
            this.mostrarimp(this.informeFinal.ifiId);
            this.valinforme = false;
          },
          (err) => {
            console.log(err);
            Swal.fire('Error', 'Ocurrió un error al guardar el informe, por favor inténtelo más tarde', 'error');
          }
        );
      } else {
        this.informeFinal.ifiCurso = this.curso;
        this.informeFinal.ifiEstado = this.estado;
        Swal.fire({
          icon: 'warning',
          title: '¿Está seguro?',
          text: '¿Desea editar el informe?',
          showCancelButton: true,
          confirmButtonText: 'Editar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.informeFinalServ.updateInformefinalCurso(this.idInforme, this.informeFinal,).subscribe(
              (data: any) => {
                Swal.fire('¡Éxito!', 'El informe se actualizo correctamente.', 'success');
              },
              (err) => {
                Swal.fire('¡Error!', 'Ha ocurrido un error al editar el informe. Por favor, inténtelo de nuevo más tarde.', 'error');
                this.mostrardatosf();
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.mostrardatosf();
            Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
          }
        });
      }
    } else {
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }

  }

  valasistencia: any
  idAsistencia: any;
  asistenciaCurson: AsistenciaCurso = new AsistenciaCurso(); // instancia de la clase asistencia curso
  obtenerasistenciacurso() {
    this.asistenciaCursoServ.getasistenciacbycurso(this.idCurso).subscribe((data: any) => {
      if (null != data) {
        this.asistenciaCurso = data;
        this.idAsistencia = this.asistenciaCurso.acuId;
        this.valasistencia = false;
        Swal.fire('¡Alerta!', 'Ya existe un informe de asistencia del curso, puede solo editarlo', 'info'); // SweetAlert al editar el área
      } else {
        Swal.fire('¡Alerta!', 'No existe un informe de asistencia del curso, puede crarlo si lo desea', 'info'); // SweetAlert al editar el área
        this.asistenciaCurso = this.asistenciaCurson;
        this.asistenciaCurso.acuCurso = this.curso;
        this.asistenciaCurso.acuObservacion = " ";
        this.asistenciaCurso.acuId = 0;
        this.mostrarimp(0);
        this.valasistencia = true;
      }
    });
  }
  imp: boolean = true;
  mostrarimp(idEntidad:any) {
    if(idEntidad!=0){
      this.imp = true;
    }else{
      this.imp = false;
    }
  }

  observacion2: boolean = true;
  saveAsistenciaCurso() {
    const observacionRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.observacion2 = observacionRegex.test(this.asistenciaCurso.acuObservacion);
    if (this.observacion2) {
      if (this.valasistencia != false) {
        this.asistenciaCurso.acuCurso = this.curso;
        this.asistenciaCurso.acuEstado = this.estado;
        this.asistenciaCursoServ.saveAsistenciaCurso(this.asistenciaCurso).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'El informe de asistencia se guardo correctamente', 'success');
            this.valasistencia = false;
            this.asistenciaCurso=data;
            this.mostrarimp(this.asistenciaCurso.acuId);
          },
          (err) => {
            console.log(err);
            Swal.fire('Error', 'Ocurrió un error al guardar el informe, por favor inténtelo más tarde', 'error');
          }
        );
      } else {
        this.asistenciaCurso.acuCurso = this.curso;
        this.asistenciaCurso.acuEstado = this.estado;
        Swal.fire({
          icon: 'warning',
          title: '¿Está seguro?',
          text: '¿Desea editar el informe de asistencia de curso?',
          showCancelButton: true,
          confirmButtonText: 'Editar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.asistenciaCursoServ.updateCurso(this.idAsistencia, this.asistenciaCurso).subscribe(
              (data: any) => {
                Swal.fire('¡Éxito!', 'El informe de asistencia se actualizo correctamente.', 'success');
              },
              (err) => {
                this.mostrardatosa();
                Swal.fire('¡Error!', 'Ha ocurrido un error al editar el informe de asistencia. Por favor, inténtelo de nuevo más tarde.', 'error');
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.mostrardatosa();
            Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
          }
        });
      }
    } else {
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }

  }


  //LISTA INFORMES
  informefinalList: any[] = [];
  public AllInformesFinal() {
    this.informeFinalServ.getAllInformefinal().subscribe((data: any) => {
      this.informefinalList = data;
    });
  }

  //lista de cursos por docente
  cursosList: any[] = [];
  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      this.cursosList = data;
    });
  }

  //Lista general de cursos
  mostrarListaCursos() {
    this, this.cursoService.getAll().subscribe((data: any) => {
      this.cursosList = data;
    });
  }

  //LISTA DE ASISTENCIAS PARA PARTICIPANTE
  asistenciasList: Asistencia[] = [];
  public listarAsistencias() {
    this.asistenciasServ.getAsistencias().subscribe((data: any) => {
      this.asistenciasList = data;
    });
  }

  //LISTA DE CERTIFICADOS
  certificadosList: any[] = [];
  public mostrarCertificados() {
    this.entregaCertificadosServ.getAllCertificados().subscribe((data: any) => {
      this.certificadosList = data;
    });
  }

  //LISTA DE PARTICIPANTES
  listParticipantes: Participante[] = [];
  public async listarParticipantesPorCurso() {
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.participanteServ
      .ParticipantesPorCurso(this.curso.curId)
      .subscribe((data: any) => {
        this.participantes = data;
        this.listParticipantes = data;
      });
  }

  //UN CERTIFICADO POR PARTICIPANTE
  certificado: EntregaCertificado = new EntregaCertificado();
  public obtenerCertificado(parId: any) {
    this.entregaCertificadosServ.getCertificadosByIdParticipante(parId).subscribe((data: any) => {
      this.certificado = data;
    });
  }

  //LISTA DE CERTIFICADOS
  listCertificados: EntregaCertificado[] = [];
  public async obtenerListaCertificados() {
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.entregaCertificadosServ.getCertificadosByCurso(this.curso.curId).subscribe((data: any) => {
      this.listCertificados = data;
    });
  }

  //Lista de fotos
  listaFotos: RegistroFotografico[] = []
  public obtenerListaFotos(){
    this.registroFotograficoServ.listarPorCurso(this.idCurso).subscribe((data: any) => {
      this.listaFotos = data;
    })
  }

  //Obtener HorarioCurso
  horarioCurso: HorarioCurso[] = [];
  public obtenerHorarioCurso(){
    this.horarioCursoServ.horariobycurso(this.curso.curId).subscribe((data: any) =>{
      this.horarioCurso = data;
    });
  }

  //Obtener HorasAprendizaje
  horasAprendizaje: HorasAprendizaje[] = [];
  public async obtenerHorasAprendizaje(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log(this.curso.datosSilabo.dsiId)
    this.horasAprendizajeServ.getBySilabo(this.curso.datosSilabo.dsiId).subscribe((data: any) =>{
      this.horasAprendizaje = data;
    });
  }

  //Obtener Resultado de aprendizane
  resultadosAprendizaje: ResultadosAprendizaje[] = [];
  public async obtenerListaResultadosAprendizaje(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.resultadosAprendizajeServ.getBySilabo(this.curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.resultadosAprendizaje = data;
    })
  }

  //Obtener contenidos Curso
  contenidosCurso: ContenidosCurso[] =[];
  public async obtenerLIstaContenidosCurso(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.contenidosCursoServ.getBySilaboId(this.curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.contenidosCurso = data;
    })
  }

  //obtener Estrategias metodológicas
  estrategiasMetodologicas: EstrategiasMetodologicas[] = [];
  public async obtenerEstrategiasMetodologicas(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.estrategiasMetodologicasServ.getBySilaboId(this.curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.estrategiasMetodologicas = data;
    })
  }

  //obtener Recursos Didacticos
  recursoDidactico: RecursosDidacticos[] = [];
  public async obtenerRecursosDidacticos(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.recursoDidacticoServ.getBySilaboId(this.curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.recursoDidactico = data;
    })
  }

  //ObtenerEvaluacionEpra
  evaluacionEpra: EvaluacionEpra[] = [];
  public async obtenerEvaluacionEpra(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.evaluacionEpraServ.getBySilaboId(this.curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.evaluacionEpra = data;
    })
  }
  //Obtener DetallesMe
  listDetallesMe: DetalleMe[] = [];
  public async obtenerDetallesMe(){
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.detallesMeServ.getAll().subscribe((data: any) => {
      this.listDetallesMe = data;
    })
  }
  //obtener fichas de inscripcion
  fichasList: any[] = [];
  public async getAllfichasIncripcion() {
    while (this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.fichaIncripcionService.FichasPorCurso(this.curso.curId).subscribe((data: any) => {
      console.log("Siiuu");
      console.log(data);
      this.fichasList = data
    });
  }


  //ACA COMIENZAN LOS CERTIFICADOS

  //Certificado --LLENADO SOLO PARA LLAMAR
  public async imprimirCertificado(parId: any) {
    this.obtenerCertificado(parId);
    while (this.certificado == null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.entregaCertificadosServ
      .printCertificado(this.certificado)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Certificado');
      });
  }

  //Lista de Certificados --LLENADO SOLO PARA LLAMAR
  public async imprimirListaCertificado() {
    this.obtenerListaCertificados();
    while (this.listCertificados.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.entregaCertificadosServ
      .printListaCertificados(this.listCertificados)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Lista de certificados');
      });
  }

  //Necesidad de curso -- NECESITO UN BOTON
  public async imprimirNecesidadCurso() {
    this.obtenerHorarioCurso()
    while (this.curso === null || this.horarioCurso.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.necesidadCursoServ
      .printNececidadCurso(this.curso, this.horarioCurso)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Necesidad de curso');
      });
  }

  //Reporte final del curso --LISTO
  public async imprimirReporteFinal(informefinal: InformeFinal) {
    this.listarParticipantesPorCurso();
    this.obtenerHorarioCurso();
    this.obtenerLIstaContenidosCurso();
    while (this.listParticipantes.length === 0 || this.horarioCurso.length === 0 ||
      this.contenidosCurso.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.informeFinalServ
      .printInformeFinalCurso(informefinal, this.listParticipantes, this.horarioCurso, this.contenidosCurso)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Informe final del curso');
    });
  }

  //Matriz mensual de cursos --NECESITO UN BOTON
  public async imprimirMatrizMensualCursos() {
    this.mostrarListaCursos();
    while (this.cursosList.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.cursoService.printMatrizCursos(this.cursosList).subscribe((data: Blob) => {
      this.crearPdf(data, 'Matriz mensual de cursos');
    });
  }

  //Registro de asistencias y evaluaciones --BOTON
  public async imprimirRegistroAsistenciaEvaluacion() {
    this.listarParticipantesPorCurso();
    this.listarAsistencias();
    this.obtenerHorarioCurso();
    while (this.listParticipantes.length === 0 || this.asistenciasList.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.asistenciasServ
      .printRegistroAsistenciaEvaluacion(
        this.asistenciasList,
        this.listParticipantes,
        this.horarioCurso,
        this.asistenciaCurso
      )
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Registro de asistencias y evaluacion');
      });
  }

  //Diseño Curricular --BOTON
  public async imprimirDisenoCurricular() {
    this.obtenerLIstaContenidosCurso();
    this.obtenerEstrategiasMetodologicas();
    this.obtenerDetallesMe();
    this.obtenerHorasAprendizaje();
    while (this.curso === null || this.contenidosCurso.length === 0 ||
      this.estrategiasMetodologicas.length === 0 || this.listDetallesMe.length === 0 ||
      this.horasAprendizaje.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.disenoCurricularServ.printDisenoCurricular(this.curso, this.contenidosCurso,
      this.estrategiasMetodologicas, this.listDetallesMe, this.horasAprendizaje).subscribe((data: Blob) => {
        this.crearPdf(data, 'Diseño Curricular');
      });
  }

  //Registro Fotografico -- BOTON
  public async imprimirRegistroFotografico() {
    this.obtenerListaFotos();
    while (this.listaFotos.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.registroFotograficoServ
      .printRegistroFotografico(this.listaFotos)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Registro Fotografico');
      });
  }

  //Registro Participantes -- BOTON
  public async imprimirRegistroParticipantes() {
    this.listarParticipantesPorCurso();
    this.obtenerHorarioCurso();
    this.getAllfichasIncripcion();
    while (this.listParticipantes.length === 0 || this.curso === null ||
      this.horarioCurso.length === 0 || this.fichasList.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.participanteServ
      .printRegistroParticipantes(this.curso, this.listParticipantes, this.horarioCurso, this.fichasList)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Registro Participantes');
      });
  }

  //Silabo -- BOTONNNNNN
  public async imprimirSilabo() {
    this.obtenerHorarioCurso();
    this.obtenerHorasAprendizaje();
    this.obtenerListaResultadosAprendizaje();
    this.obtenerLIstaContenidosCurso();
    this.obtenerEstrategiasMetodologicas();
    this.obtenerRecursosDidacticos();
    this.obtenerEvaluacionEpra();
    while (this.curso === null || this.horarioCurso.length === 0 || this.horasAprendizaje.length === 0 ||
      this.resultadosAprendizaje.length === 0 || this.contenidosCurso.length === 0 ||
      this.estrategiasMetodologicas.length === 0 || this.recursoDidactico.length === 0 ||
      this.evaluacionEpra.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.silaboServ
      .printSilabo(this.curso, this.horarioCurso, this.horasAprendizaje, this.resultadosAprendizaje,
        this.contenidosCurso, this.estrategiasMetodologicas, this.recursoDidactico, this.evaluacionEpra)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Silabo');
      });
  }

  //ReporteGeneralCursosFinalizados
  public async imprimirReporteGeneralCursosFinalizados(){
    this.listarParticipantesPorCurso();
    this.mostrarListaCursos();
    while (this.listParticipantes.length === 0 || this.cursosList.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.cursoService.printReporteGeneralCursosFinalizados(this.listParticipantes, this.cursosList)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Reporte General Cursos Finalizados');
      });
  }

  private crearPdf(data: Blob, nombre: String) {
    const url = URL.createObjectURL(data);
    // Crear un enlace de descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = nombre + '.pdf';

    // Agregar el enlace al DOM y hacer clic en él
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Limpiar y revocar el objeto URL creado
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }
}
