import { DetalleMe } from "./detalleme";
import { DisenoCurricular } from "./disenoCurricular";

export class MecanismoEvaluacion {

  mevId: number= 0;
  mevDescripcion!: string;
  mevEstado: boolean=true;

  detallesME?: DetalleMe[];

  mevDiseno: DisenoCurricular = new DisenoCurricular;

  }