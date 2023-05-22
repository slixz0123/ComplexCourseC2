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


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  informeFinal : InformeFinal = new InformeFinal; // instancia de la clase informe finla
  asistenciaCurso: AsistenciaCurso = new AsistenciaCurso; // instancia de la clase asistencia curso
  curso: Curso = new Curso; // instancia de la clase asistencia curso
  idPersona: any;
  idInformefinal: any;
  idAsistenciaCurso: any;
  estado: boolean = true;

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;

  constructor(
    private informeFinalServ : InformeFinalService,
    private cursoService: CursoService,
    private asistenciaCursoServ : AsistenciaCursoService,
    private silaboServ: DatossilaboservService
  ){

  }

  ngOnInit(): void {

    this.AllInformesFinal();
    this.listarAsistenciasCurso();
    this.idPersona= localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
  }
  saveInformefinal() {

    this.informeFinal.curso= this.curso;
    this.informeFinal.ifiEstado=this.estado;
    console.log(this.informeFinal)
    this.informeFinalServ.saveInformefinal(this.informeFinal).subscribe(
      (data: any) => {
        console.log('a verrr' + data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public imprimirReporteFinal(informefinal: InformeFinal) {
    this.informeFinalServ.printInformeFinalCurso(informefinal).subscribe((data: Blob) => {
      const url = URL.createObjectURL(data);

      // Crear un enlace de descarga
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'reporteFinalCurso.pdf';

      // Agregar el enlace al DOM y hacer clic en él
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Limpiar y revocar el objeto URL creado
      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    });
  }

  informefinalList: any[] = [];
  public AllInformesFinal() {

    this.informeFinalServ.getAllInformefinal().subscribe((data: any) => {
      this.informefinalList = data;
      console.log("aquiiii")
      console.log(data)
    });
  }

  editarInformefinal(informefinal: any) {
    console.log(this.informeFinal.ifiFecha)
    const fechai = new Date(informefinal.ifiFecha);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    informefinal.ifiFecha = fechaFormateadai;
    this.informeFinal = informefinal;
  }

// Reporte asistencia curso

  saveAsistenciaCurso() {

    this.asistenciaCurso.curso= this.curso;
    this.asistenciaCurso.acuEstado=this.estado;
    console.log(this.asistenciaCurso)
    this.asistenciaCursoServ.saveAsistenciaCurso(this.asistenciaCurso).subscribe(
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
      console.log("aquiiii")
      console.log(data)

    });
  }

  editarAsistenciasCurso(asistencia: any) {
    console.log(this.asistenciaCurso.acuFechaelaboracion)
    const fechai = new Date(asistencia.acuFechaelaboracion);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    asistencia.acuFechaelaboracion = fechaFormateadai;
    this.asistenciaCurso = asistencia;

  }

  cursosList: any[] = [];
  mostrarCursos(idPersona: any ) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      this.cursosList = data;
      console.log("Siiuu Curso")
      console.log(this.cursosList)
    });
  }

  public imprimirSilabo(curso: Curso) {
    console.log(curso);
    this.silaboServ.printSilabo(curso).subscribe((data: Blob) => {
      const url = URL.createObjectURL(data);

      // Crear un enlace de descarga
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'Silabo.pdf';

      // Agregar el enlace al DOM y hacer clic en él
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Limpiar y revocar el objeto URL creado
      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    });
  }

  tipoReporte(num: number){

  }
}
