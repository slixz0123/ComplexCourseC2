import { Participante } from "./participante";

export class Asistencia {

  asiId: number = 0;
  asiNumfaltas: string = '';
  asiFecha: string = '';
  asiEstado: boolean = true;

  asiParticipante: Participante = new Participante;

}