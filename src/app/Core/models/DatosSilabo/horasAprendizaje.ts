import { Datossilabo } from "./datosSilabo";

export class HorasAprendizaje { 
  hapId: number =0;
  hapDocencia?: number;
  hapPracticas?: number;
  hapTrabajoAutonomo?: number;
  hapEstado?: boolean;

  hapSilabo: Datossilabo = new Datossilabo;
  }