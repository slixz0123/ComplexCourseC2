import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Participante } from 'src/app/Core/models/participante';
import { Persona } from 'src/app/Core/models/persona';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-participante',
  templateUrl: './register-participante.component.html',
  styleUrls: ['./register-participante.component.css']
})
export class RegisterParticipanteComponent implements OnInit {
  fichaIncripcion: FichaInscripcion = new FichaInscripcion();
  participante: Participante = new Participante();
  fichaInscripcion: FichaInscripcion = new FichaInscripcion();
  curso: Curso = new Curso();
  idPersona: any;
  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;

  constructor(
    private cursoService: CursoService,
    private participanteService: ParticipanteService,
    private fichaInscripcionService: FichaIncripcionService
  ) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona')
    this.ListarCursos();
  }
  cursosList: any[] = [];
  ListarCursos() {
    this.cursoService.cursosporDocente(this.idPersona).subscribe(
      (data: any) => {
        // Filtrar los datos por estado diferente a finalizado
        this.cursosList = data.filter((curso: Curso) => curso.curProceso != 'Finalizado');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fichaList: any[] = [];
  mostrarFichas(idCurso: any) {
    this.fichaInscripcionService.FichasPorCurso(idCurso).subscribe((data: any) => {
      this.fichaList = data.filter((fichas: FichaInscripcion) => fichas.finAprobacion != 3 && fichas.finAprobacion != 1);
    });
  }

  // Definir el array de mapeo de estados
  estados: any[] = [
    { value: 0, label: 'Pendiente' },
    { value: 1, label: 'Aceptado' },
    { value: 2, label: 'Corregir' },
    { value: 3, label: 'Rechazado' }
  ];

  estadosAprobacion = ['Pendiente', 'Aceptado', 'Corregir', 'Rechazado'];

  editarAprobacion(ficha: FichaInscripcion) {
    this.fichaInscripcion = ficha
    this.mostrarFichas(ficha.finCurso.curId)
  }
  
  fichapa: FichaInscripcion = new FichaInscripcion();
  actualizarficha(fichaactualizada: FichaInscripcion) {
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      text: '¿Desea editar la ficha de inscripción?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fichaInscripcionService.updateFichaIncripcion(fichaactualizada.finId, fichaactualizada).subscribe(
          (data: any) => {
            this.fichapa = data
            this.crearparticipante(this.fichapa);
            this.mostrarFichas(this.fichapa.finCurso?.curId);
            // this.mostrarFichas(fichaactualizada.finCurso.curId);
            Swal.fire('¡Éxito!', 'La ficha de inscripción se ha actualizado exitosamente.', 'success');
            this.showContainer4=false;
            this.mostrarFichas(this.fichapa.finCurso.curId)
          },
          (err) => {
            console.log(err);
            Swal.fire('¡Error!', 'Ha ocurrido un error al actualizar la ficha de inscripción. Por favor, inténtelo de nuevo más tarde.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
        this.mostrarFichas(fichaactualizada.finCurso.curId)
      }
    });
  }

  crearparticipante(fichain: FichaInscripcion) {
    if (fichain.finAprobacion == 1) {
      console.log("entra")
      this.participante.parId = 0;
      this.participante.parNotaparcial = 0;
      this.participante.parNotafinal = 0;
      this.participante.parPromedio = 0;
      this.participante.parObservacion = "Sin Observaciones"
      this.participante.parEstadoaprovacion = "Cursando"
      this.participante.parEstado = true
      this.participante.parPersona = fichain.finPersona
      this.participante.parCurso = fichain.finCurso
      console.log("este mando")
      console.log(this.participante)
      this.participanteService.crearParticipante(this.participante).subscribe(
        (data: any) => {
          this.mostrarFichas(fichain.finCurso?.curId);
          Swal.fire('¡Éxito!', 'El participante se creo exitosamente.', 'success');
        },
        (err) => {
          console.log(err);
          Swal.fire('¡Error!', 'Ha ocurrido un error al crear el participante. Por favor, inténtelo de nuevo más tarde.', 'error');
        }
      );
    }
  }

}
