import { Area } from "./area";
import { MecanismoEvaluacion } from "./mecanismoevaluacion";

export class DetalleMe {
    dmeId: number=0;
    dmeTecnica: string="";
    dmeInstrumento: string="";
    dmeEstado: boolean=true;
    
    mecanismoEvaluacion: MecanismoEvaluacion = new MecanismoEvaluacion;

  }