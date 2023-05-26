import { Component } from '@angular/core';
import { InformeFinalService } from 'src/app/shared/Services/informeFinalcurso.service';
import { InformeFinal } from 'src/app/Core/models/informeFinal';
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
    private fichaInscripcionServ: FichaIncripcionService,
    private registroFotograficoServ: RegistroFotograficoService,
    private horarioCursoServ: HorarioCursoService,
    private horasAprendizajeServ: HorasaprendizajeservService,
    private resultadosAprendizajeServ: ResultadosaprendizajeservService,
    private contenidosCursoServ: ContenidocurservService,
    private estrategiasMetodologicasServ: EstrategiasmetservService,
    private recursoDidacticoServ: RecursosdidacticosservService,
    private evaluacionEpraServ: EvaluaepraService
  ) {}

  ngOnInit(): void {
    this.AllInformesFinal();
    this.listarAsistenciasCurso();
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
  }
  saveInformefinal() {
    this.informeFinal.curso = this.curso;
    this.informeFinal.ifiEstado = this.estado;
    console.log(this.informeFinal);
    this.informeFinalServ.saveInformefinal(this.informeFinal).subscribe(
      (data: any) => {
        console.log('a verrr' + data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editarInformefinal(informefinal: any) {
    console.log(this.informeFinal.ifiFecha);
    const fechai = new Date(informefinal.ifiFecha);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    informefinal.ifiFecha = fechaFormateadai;
    this.informeFinal = informefinal;
  }

  saveAsistenciaCurso() {
    this.asistenciaCurso.curso = this.curso;
    this.asistenciaCurso.acuEstado = this.estado;
    console.log(this.asistenciaCurso);
    this.asistenciaCursoServ
      .saveAsistenciaCurso(this.asistenciaCurso)
      .subscribe(
        (data: any) => {
          console.log('a verrr' + data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  asistenciasCursolList: any[] = [];
  public listarAsistenciasCurso() {
    this.asistenciaCursoServ.getAllAsisteciasCursos().subscribe((data: any) => {
      this.asistenciasCursolList = data;
      console.log('aquiiii');
      console.log(data);
    });
  }

  editarAsistenciasCurso(asistencia: any) {
    console.log(this.asistenciaCurso.acuFechaelaboracion);
    const fechai = new Date(asistencia.acuFechaelaboracion);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    asistencia.acuFechaelaboracion = fechaFormateadai;
    this.asistenciaCurso = asistencia;
  }

  //Un curso
  obtenerCurso (curId: any){
    this.cursoService.getById(curId).subscribe((data: any) => {
      this.curso = data;
    })
  }
  //LISTA INFORMES
  informefinalList: any[] = [];
  public AllInformesFinal() {
    this.informeFinalServ.getAllInformefinal().subscribe((data: any) => {
      this.informefinalList = data;
      console.log('aquiiii');
      console.log(data);
    });
  }

  //lista de cursos por docente
  cursosList: any[] = [];
  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      this.cursosList = data;
      console.log('Siiuu Curso');
      console.log(this.cursosList);
    });
  }

  //Lista general de cursos
  mostrarListaCursos(){
    this,this.cursoService.getAll().subscribe((data: any) => {
      this.cursosList = data;
    });
  }

  //LISTA DE ASISTENCIAS PARA PARTICIPANTE
  asistenciasList: Asistencia[] = [];
  public listarAsistencias() {
    this.asistenciasServ.getAsistencias().subscribe((data: any) => {
      this.asistenciasList = data;
      console.log('aquiiii');
      console.log(data);
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
  public listarParticipantesPorCurso(curId: any) {
    this.participanteServ
      .ParticipantesPorCurso(curId)
      .subscribe((data: any) => {
        console.log(data);
        this.participantes = data;
        this.listParticipantes = data;
      });
  }

  //UN CERTIFICADO POR PARTICIPANTE
  certificado: EntregaCertificado = new EntregaCertificado();
  public obtenerCertificado(parId:any){
    this.entregaCertificadosServ.getCertificadosByIdParticipante(parId).subscribe((data: any) => {
      this.certificado = data;
    });
  }

  //LISTA DE CERTIFICADOS
  listCertificados: EntregaCertificado[] = [];
  public obtenerListaCertificados(curId: any){
    this.entregaCertificadosServ.getCertificadosByCurso(curId).subscribe((data: any) => {
      this.listCertificados = data;
    });
  }

  //ficha de inscripcion por participante
  ficha: FichaInscripcion = new FichaInscripcion();
  public obtenerFichaInscripcion(idPersona: any){
    this.fichaInscripcionServ.getfichasbypersona(idPersona).subscribe((data: any) => {
      this.ficha = data
    });
  }

  //Necesidad de curso
  necesidad: NecesidadCurso = new NecesidadCurso();
  public obtenerNecesidadCurso(curId: any){
    this.cursoService.getById(curId).subscribe((data: Curso) => {
      this.necesidad = data.necesidadCurso;
    })
  }

  //Lista de fotos
  listaFotos: RegistroFotografico[] = []
  public obtenerListaFotos(curId: any){
    this.registroFotograficoServ.listarPorCurso(curId).subscribe((data: any) => {
      this.listaFotos = data;
    })
  }

  //Obtener HorarioCurso
  horarioCurso: HorarioCurso = new HorarioCurso();
  public obtenerHorarioCurso(curId: any){
    this.horarioCursoServ.horariobycurso(curId).subscribe((data: any) =>{
      this.horarioCurso = data;
    });
  }

  //Obtener HorasAprendizaje
  horasAprendizaje: HorasAprendizaje = new HorasAprendizaje();
  public obtenerHorasAprendizaje(curso: Curso){
    this.horasAprendizajeServ.getBySilabo(curso.datosSilabo.dsiId).subscribe((data: any) =>{
      this.horasAprendizaje = data;
    });
  }

  //Obtener Resultado de aprendizane
  resultadosAprendizaje: ResultadosAprendizaje[] = [];
  public obtenerListaResultadosAprendizaje(curso: Curso){
    this.resultadosAprendizajeServ.getBySilabo(curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.resultadosAprendizaje = data;
    })
  }

  //Obtener contenidos Curso
  contenidosCurso: ContenidosCurso[] =[];
  public obtenerLIstaContenidosCurso(curso: Curso){
    this.contenidosCursoServ.getBySilaboId(curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.contenidosCurso = data;
    })
  }

  //obtener Estrategias metodológicas
  estrategiasMetodologicas: EstrategiasMetodologicas[] = [];
  public obtenerEstrategiasMetodologicas(curso: Curso){
    this.estrategiasMetodologicasServ.getBySilaboId(curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.estrategiasMetodologicas = data;
    })
  }

  //obtener Recursos Didacticos
  recursoDidactico: RecursosDidacticos = new RecursosDidacticos();
  public obtenerRecursosDidacticos(curso: Curso){
    this.recursoDidacticoServ.getBySilaboId(curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.recursoDidactico = data;
    })
  }

  //ObtenerEvaluacionEpra
  evaluacionEpra: EvaluacionEpra = new EvaluacionEpra();
  public obtenerEvaluacionEpra(curso: Curso){
    this.evaluacionEpraServ.getBySilaboId(curso.datosSilabo.dsiId).subscribe((data: any) => {
      this.evaluacionEpra = data;
    })
  }

  tipoReporte(num: number) {}

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
  public async imprimirListaCertificado(curId: any) {
    this.obtenerListaCertificados(curId);
    while (this.listCertificados.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.entregaCertificadosServ
      .printListaCertificados(this.listCertificados)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'ListaCertificados');
      });
  }

  //Necesidad de curso -- NECESITO UN BOTON
  public async imprimirNecesidadCurso(curId: any) {
    this.obtenerNecesidadCurso(curId)
    while (this.necesidad === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.necesidadCursoServ
      .printNececidadCurso(this.necesidad)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'NecesidadCurso');
      });
  }

  //Reporte final del curso --LISTO
  public async imprimirReporteFinal(informefinal: InformeFinal, curId: any) {
    this.listarParticipantesPorCurso(curId);
    while (this.listParticipantes.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.informeFinalServ
      .printInformeFinalCurso(informefinal, this.listParticipantes)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Reporte final');
      });
  }

  //ficha de inscripcion -- NECESITO UN BOTON
  public async imprimirFichaInscripcion(idPersona: any) {
    this.obtenerFichaInscripcion(idPersona);
    while (this.ficha == null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.fichaInscripcionServ
      .printFichaInscripcion(this.ficha)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Ficha de inscripcion');
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
  public async imprimirRegistroAsistenciaEvaluacion(curId: any) {
    this.listarParticipantesPorCurso(curId);
    this.listarAsistencias();
    while (this.listParticipantes.length === 0 || this.asistenciasList.length === 0) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.asistenciasServ
      .printRegistroAsistenciaEvaluacion(
        this.asistenciasList,
        this.listParticipantes
      )
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Registro de asistencias y evaluacion');
      });
  }

  //Registro Fotografico -- BOTON
  public async imprimirRegistroFotografico(id_persona: any) {
    this.obtenerListaFotos(id_persona);
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
  public async imprimirRegistroParticipantes(curId: any) {
    this.listarParticipantesPorCurso(curId);
    this.obtenerCurso(curId);
    while (this.listParticipantes.length === 0 || this.curso === null) {
      // Realizar una pausa para evitar un ciclo infinito
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.participanteServ
      .printRegistroParticipantes(this.listParticipantes, this.curso)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Registro Participantes');
      });
  }

  //Silabo -- BOTONNNNNN
  public async imprimirSilabo(curId: any) {
    this.obtenerCurso(curId);
    this.obtenerHorarioCurso(this.curso);
    this.obtenerHorasAprendizaje(this.curso);
    this.obtenerListaResultadosAprendizaje(this.curso);
    this.obtenerLIstaContenidosCurso(this.curso);
    this.obtenerEstrategiasMetodologicas(this.curso);
    this.obtenerRecursosDidacticos(this.curso);
    this.obtenerEvaluacionEpra(this.curso);
    while (this.curso === null || this.horarioCurso === null || this.horasAprendizaje === null ||
      this.resultadosAprendizaje.length === 0 || this.contenidosCurso.length === 0 ||
      this.estrategiasMetodologicas.length === 0 || this.recursoDidactico === null ||
      this.evaluacionEpra === null) {
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
  private async imprimirReporteGeneralCursosFinalizados(curId: any){
    this.listarParticipantesPorCurso(curId);
    this.mostrarListaCursos();
    while (this.listParticipantes.length === 0 || this.cursosList === null) {
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
