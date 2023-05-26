import { Participante } from "./participante";

export class EntregaCertificado {
    eceId: number = 0;
    eceCodigocertificado: string = '';
    eceFecharetiro: Date = new Date;
    eceFirma: boolean = false;
    eceEstado!: boolean;
    eceParticipante: Participante = new Participante;
  }
  