import { Area } from "./area";
import { DisenoCurricular } from "./disenoCurricular";

export class EntornoAprendizaje {
  eapId: number = 0;
  eapInstalaciones: string = '';
  eapRecursos: string = '';
  eapFaseteorica: string = '';
  eapFasepractica: string = '';
  eapEstado: boolean = true;

  eapDiseno: DisenoCurricular = new DisenoCurricular;
  }