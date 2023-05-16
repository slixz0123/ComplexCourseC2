import { MecanismoEvaluacion } from "./mecanismoEvaluacion";

export class DetalleMe {
    dmeId: number=0;
    dmeTecnica: string="";
    dmeInstrumento: string="";
    dmeEstado: boolean=true;
    
    mecanismoEvaluacion: MecanismoEvaluacion = new MecanismoEvaluacion;

  }