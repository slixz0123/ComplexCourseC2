import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';

@Component({
  selector: 'app-register-notas',
  templateUrl: './register-notas.component.html',
  styleUrls: ['./register-notas.component.css']
})
export class RegisterNotasComponent {
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
    private participanteService: ParticipanteService
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
  mostrarParticipante(idCurso: any) {
    this.participanteService.ParticipantesPorCurso(idCurso).subscribe((data: any) => {
      this.participantesList = data;
    });
  }
  savenotas(participnate: any) {
    this.participanteService.updateparticipante(participnate.parId, participnate).subscribe(() => {

    });
  }
  editarNotas(participnated: any) {
    this.participante = participnated
  }
}
