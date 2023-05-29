import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Persona } from 'src/app/Core/models/persona';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-cursos-aplicados',
  templateUrl: './cursos-aplicados.component.html',
  styleUrls: ['./cursos-aplicados.component.css']
})
export class CursosAplicadosComponent {
  fichaIncripcion: FichaInscripcion = new FichaInscripcion();
  persona: Persona = new Persona();
  curso: Curso = new Curso();
  idPersona: any;
  showContainer1: boolean = true;
  showContainer2: boolean = true;
  showContainer3: boolean = false;
  showContainer4: boolean = false;
  constructor(
    private participanteService: ParticipanteService,
    private horarioCursoService: HorarioCursoService,
    private cursoService: CursoService,
    private personaService: PersonaService

  ) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona')
    this.getAllfichasIncripcion(this.idPersona);

  }
  cursoPartcipanteList: any[] = [];
  getAllfichasIncripcion(idPersona: any) {
    this.participanteService.cursosPersonaparticipante(this.idPersona).subscribe(
      (data: any) => {
        this.cursoPartcipanteList = data;

      },
      (err) => {
        // console.log(err);
      }
    );
  }

  mostrarDatosCurso(idcurso: any) {
    this.cursoService.getById(idcurso).subscribe(
      (data: any) => {
        this.curso = data;
        // console.log(this.curso);
        this.mostrarDatoshc();
      },
      (err) => {
        // console.log(err);
      }
    );

  }

  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc() {
    this.horarioCursoService.horariobycurso(this.curso.curId).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
        this.horariosTexto = "";
        for (let hc of this.horarioscursoList) {
          this.numr = +1;
          this.horariosTexto += `${hc.horario.horInicio} - ${hc.horario.horFin}\n`;
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  public mostrarDatosdocete(idDocente: any) {
    this.personaService.getPorId(idDocente).subscribe(
      (data: any) => {
        this.persona = data;
        this.mostrarCursosDocente(idDocente)
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  cursoList: any[] = [];
  public mostrarCursosDocente(idDocente: any) {
    this.cursoService.cursosporDocente(idDocente).subscribe(
      (data: any) => {
        this.cursoList = data;

        // console.log(this.cursoList);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
}

