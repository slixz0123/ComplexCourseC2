import { Participante } from "./participante";

export class Asistencia {

  asiId: number = 0;
  asiNumfaltas: number = 0;
  asiFecha: Date = new Date;
  asiEstado: boolean = true;

  asiParticipante: Participante = new Participante;

}