import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Participante } from 'src/app/Core/models/participante';
import { Persona } from 'src/app/Core/models/persona';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';

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
        console.log("fichas acep");
        console.log(this.cursosList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  participantesList: any[] = [];
  mostrarParticipante(idCurso: any) {
    this.participanteService.ParticipantesPorCurso(idCurso).subscribe((data: any) => {
      this.participantesList = data;
    });
  }

  fichaList: any[] = [];
  mostrarFichas(idCurso: any) {
    this.fichaInscripcionService.FichasPorCurso(idCurso).subscribe((data: any) => {
      this.fichaList = data.filter((ficha: FichaInscripcion) => ficha.finAprobacion != 3 && ficha.finAprobacion != 1 );
      console.log("fichas acep");
      console.log(this.fichaList)
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

  editarAprobacion(ficha: any) {
    this.fichaInscripcion = ficha
  }
  fichapa: FichaInscripcion = new FichaInscripcion();
  actualizarficha(fichaactualizada: any){
    console.log("esta mando")
    console.log(fichaactualizada)
    this.fichaInscripcionService.updateFichaIncripcion(fichaactualizada.finId,fichaactualizada).subscribe(
      (data: any) => {
        console.log("esta trae")
        console.log(data);
        this.fichapa=data
        this.crearparticipante(this.fichapa);
        // this.mostrarFichas(fichaactualizada.finCurso.curId);
        console.log("afirmativo pareja")
      },
      (err) => {
        console.log(err);
      }
    );
  }

  crearparticipante(fichain: FichaInscripcion){
    if(fichain.finAprobacion==1){
      console.log("entra")
      this.participante.parId=0;
      this.participante.parNotaparcial=0;
      this.participante.parNotafinal=0;
      this.participante.parPromedio=0;
      this.participante.parObservacion="Sin Observaciones"
      this.participante.parEstadoaprovacion="Cursando"
      this.participante.parEstado=true
      this.participante.parPersona=fichain.finPersona
      this.participante.parCurso=fichain.finCurso
      console.log("este mando")
      console.log(this.participante)
      this.participanteService.crearParticipante(this.participante).subscribe(
        (data: any) => {
          this.mostrarFichas(fichain.finCurso?.curId);
          console.log("siuuuuuuuu")
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
