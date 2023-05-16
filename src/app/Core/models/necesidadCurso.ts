import { Dias } from "./dias";

export class NecesidadCurso {
    
    ncuId: number =0;
    ncuFechaprevisfin: Date = new Date();
    ncuNumparticipantes?: number;
    ncuIdentificador:string='';
    ncuResumenyproyecto?: string;
    ncuPoblaciondirigida?: string;
    ncuLugardicta?: string;
    ncuEstado?: boolean;
    dia: Dias = new Dias;
    
  }