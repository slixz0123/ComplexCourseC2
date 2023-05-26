import { Participante } from "./participante";


export class EntregaCertificado{
  eceId: number = 0;
  eceCodigocertificado: String = '';
  eceFecharetiro: Date = new Date();
  eceFirma: boolean = true;
  eceEstado: boolean = true;

  eceParticipante: Participante = new Participante();

}
