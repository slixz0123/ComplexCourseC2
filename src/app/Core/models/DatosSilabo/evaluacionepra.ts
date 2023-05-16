import { Datossilabo } from "./datosSilabo";

export class EvaluacionEpra { 
    eraId: number =0;
    eraTipoactividades?: String;
    eraCantactvidades?: number;
    eraPorcentcalificacion?: number;
    eraTotal?: number;
    eraEstado?: boolean;
    
    eraSilabo: Datossilabo = new Datossilabo;
  }