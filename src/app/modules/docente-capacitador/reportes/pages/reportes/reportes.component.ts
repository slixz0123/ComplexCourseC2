import { Component } from '@angular/core';
import { AsistenciaCursoServ  } from 'src/app/shared/Services/asistenciaCurso-serv.service';
import { InformeFinalServ } from 'src/app/shared/Services/informeFinalc-serv.service';
import { CursoServ } from 'src/app/shared/Services/curso-serv.service';
import { InformeFinal } from 'src/app/Core/models/InformeFinal';
import { Curso } from 'src/app/Core/models/curso';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import * as XLSX from 'xlsx';
import { AfterViewInit } from '@angular/core';
import { AsistenciaCurso } from 'src/app/Core/models/asistenciaCurso';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  informeFinal : InformeFinal = new InformeFinal; // instancia de la clase informe finla
  asistenciaCurso: AsistenciaCurso = new AsistenciaCurso; // instancia de la clase asistencia curso
  curso: Curso = new Curso; // instancia de la clase asistencia curso

  idInformefinal: any;
  idAsistenciaCurso: any;
  estado: boolean = true;
  constructor(
    private informeFinalServ : InformeFinalServ,
    private asistenciaCursoServ : AsistenciaCursoServ,
  
  ){

  }

  ngOnInit(): void {

    this.AllInformesFinal();
    this.listarAsistenciasCurso
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
}
