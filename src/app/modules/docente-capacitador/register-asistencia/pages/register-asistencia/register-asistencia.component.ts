import { Component } from '@angular/core';
import { Asistencia } from 'src/app/Core/models/asistencia';
import { Participante } from 'src/app/Core/models/participante';
import { AsistenciaServService } from 'src/app/shared/Services/asistencia-serv.service';
import { participanteService } from 'src/app/shared/Services/participante-serv.service';

@Component({
  selector: 'app-register-asistencia',
  templateUrl: './register-asistencia.component.html',
  styleUrls: ['./register-asistencia.component.css']
})
export class RegisterAsistenciaComponent {

  fecha!: string;
  participantes: Participante[] = [];
  selectedParticipante: Participante = new Participante();
  asistencias: Asistencia[] = [];
  asistenciaSeleccionada: Asistencia = new Asistencia();


  constructor(private asistenciaServ: AsistenciaServService, private participanteServ: participanteService) {
    const date = new Date();
  this.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.getParticipantes(1);
  }

  getParticipantes(curId: number): void {
    this.participanteServ.obtenerParticipantesPorCurso(curId)
      .subscribe(participantes => this.participantes = participantes);
  }

  getAsistencias(): void {
    this.asistenciaServ.getAsistencias().subscribe(asistencias => this.asistencias = asistencias);
  }

  updateAsistencia(asistencia: Asistencia): void {
    this.asistenciaServ.updateAsistencia(this.asistenciaSeleccionada, this.asistenciaSeleccionada.asiId).subscribe();
  }
}
