import { Datossilabo } from "./datosSilabo";

export class ResultadosAprendizaje { 
    rapId: number =0;
    rapUnidadcompe: String ="";
    rapResultadosaprenactiv: String="";
    rapFormaevidenciar: String="";
    rapElementoscompe:String="";
    rapEstado?: boolean;

    rapSilabo: Datossilabo = new Datossilabo;
  }