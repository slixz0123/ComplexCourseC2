import { Participante } from "./participante";

export class entregaCertificado{
    eceId:number=0;
    eceCodigocertificado:string='';
    eceFecharetiro:Date=new Date();
    eceFirma:boolean=true;
    eceEstado:boolean=true;
    eceParticipante: Participante=new Participante();
}