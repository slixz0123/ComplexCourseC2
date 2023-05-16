import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { ProgramaCapacitacion } from 'src/app/Core/models/ProgramaCapacitacion';
import { CursoServ } from 'src/app/shared/Services/curso-serv.service';
import { EnvioDatosService } from 'src/app/shared/Services/envioDatos-serv.service';
import { HorarioCursoServ } from 'src/app/shared/Services/horarioCurso-serv.service';
import { ProgramaCapacitacionServ } from 'src/app/shared/Services/programaCapacitacion-serv.service';

@Component({
  selector: 'app-visualizar-programas-capacitacion',
  templateUrl: './visualizar-programas-capacitacion.component.html',
  styleUrls: ['./visualizar-programas-capacitacion.component.css']
})
export class VisualizarProgramasCapacitacionComponent {
  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();
  nprogramaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();
  curso: Curso = new Curso();
  ncurso: Curso = new Curso();





  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionServ,
    private horarioCursoService: HorarioCursoServ,
    private enviarDatosService: EnvioDatosService ,
    private cursoService: CursoServ

  ) { }

  ngOnInit(): void {
    // this.id_persona = localStorage.getItem('id_persona');
    this.getAllProgramasc();

  }

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;


  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getAllProgramasC().subscribe((data: any) => {
      this.programasList = data;
      console.log("Siiuu")
      console.log(this.programasList)
    });
  }
  cursosList: any[] = [];
  mostrarCursos(miPrograma: ProgramaCapacitacion) {
    this.cursoService.cursosporPrograma(miPrograma.pcaId).subscribe((data: any) => {
      this.cursosList = data;
      console.log("Siiuu Curso")
      console.log(this.cursosList)
    });
  }

  mostrarDatosCurso(mcurso: Curso) {
    this.curso = mcurso
    this.mostrarDatoshc();
  }


  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc() {
    this.horarioCursoService.horariobycurso(this.curso.curId).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
        this.horariosTexto="";
        for (let hc of this.horarioscursoList) {
          this.numr = +1;
          this.horariosTexto += `${hc.horario.horInicio} - ${hc.horario.horFin}\n`;
        }
        console.log(this.horarioscursoList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  EnviarCurso(idCurso: any) {
    console.log(idCurso)
    this.enviarDatosService.setIdCurso(idCurso);
  }

}
