import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import Swal from 'sweetalert2';

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
  mostrarParticipante(idCurso: any,idHorario:any) {
    this.participanteService.ParticipantesPorhorarioc(idCurso,idHorario).subscribe((data: any) => {
      this.participantesList = data;
    });
    // this.mostrarDatoshc(idCurso)

  }

  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc(idCurso:any) {
    this.horarioCursoService.horariobycurso(idCurso).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
        this.horariosTexto = "";
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

  savenotas(participante: any) {
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      text: '¿Desea editar las notas del estudiante?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participanteService.updateparticipante(participante.parId, participante).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'Las notas se actualizaron correctamente.', 'success');
          },
          (err) => {
            console.log(err);
            Swal.fire('¡Error!', 'Ha ocurrido un error al actualizar las notas del estudiante. Por favor, inténtelo de nuevo más tarde.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }

  editarNotas(participnated: any) {
    this.participante = participnated
  }
}
