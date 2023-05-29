import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';

@Component({
  selector: 'app-edit-list-notas',
  templateUrl: './edit-list-notas.component.html',
  styleUrls: ['./edit-list-notas.component.css']
})
export class EditListNotasComponent {
  curso: Curso = new Curso; // instancia de la clase asistencia curso
  idPersona: any;
  estado: boolean = true;
  participante: Participante = new Participante;
  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;

  constructor(
    private cursoService: CursoService,
    private participanteService: ParticipanteService,
    private horarioCursoService: HorarioCursoService,
  ) {

  }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
    // this.mostrarParticipante(1)
  }
  cursosList: any[] = [];
  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter((curso: Curso) => curso.curProceso !== 'Finalizado');
    });
  }
  participantesList: any[] = [];
  mostrarParticipante(idCurso: any, idHorario: any) {
    this.participanteService.ParticipantesPorhorarioc(idCurso, idHorario).subscribe((data: any) => {
      this.participantesList = data;
    });
    // this.mostrarDatoshc(idCurso)

  }

  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc(idCurso: any) {
    this.horarioCursoService.horariobycurso(idCurso).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
        this.horariosTexto = "";
        for (let hc of this.horarioscursoList) {
          this.numr = +1;
          this.horariosTexto += `${hc.horario.horInicio} - ${hc.horario.horFin}\n`;
        }
        //console.log(this.horarioscursoList);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  verdatos(participnated: any) {
    //console.log("muuuuu")
    this.participante = participnated
    this.cursosParticipantepersona(participnated.parPersona.id_persona);
  }

  cursoPartcipanteList: any []=[];
  public cursosParticipantepersona(idPersona:any) {
    this.participanteService.cursosPersonaparticipante(idPersona).subscribe(
      (data: any) => {
        this.cursoPartcipanteList = data;
        //console.log("estos son")
        //console.log(this.cursoPartcipanteList);
      },
      (err) => {
        //console.log(err);
      }
    );
  }
}