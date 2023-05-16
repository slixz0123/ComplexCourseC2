import { Datossilabo } from "./datosSilabo";

export class ContenidosCurso { 
    ccuId: number =0;
    ccuDia: number =0;
    ccuContenidos?: String;
    ccuHorasclase?: number;
    ccuActividaddocencia?: String;
    ccuHoraspractica?: number;
    ccuActividadpractica?: String;
    ccuHorastrabajoauto?: number;
    ccuActividadtrabajoauto?: String;
    ccuObservaciones?: String;
    ccuEstado?: boolean;

    ccuSilabo: Datossilabo = new Datossilabo; //id_persona herencia
  }