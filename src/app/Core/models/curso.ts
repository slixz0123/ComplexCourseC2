import { Especialidad } from "./especialidad";
import { Datossilabo } from "./DatosSilabo/datosSilabo";
import { DisenoCurricular } from "./disenoCurricular";
import { Persona } from "./persona";
import { ProgramaCapacitacion } from "./ProgramaCapacitacion";
import { NecesidadCurso } from "./necesidadCurso";
import { ModalidadCurso } from "./modalidadCurso";
import { TiposCurso } from "./tipoCurso";

export class Curso {

  curId: number = 0;
  curCodigo: String = '';
  curNombre: string = '';
  curFechainicio: Date = new Date();
  curFechafin: Date = new Date();
  curNumHoras: number = 0;
  curProceso: string = '';
  curEstado: boolean = true;

  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion;
  ecursos: Especialidad = new Especialidad;
  mcursos: ModalidadCurso = new ModalidadCurso;
  tipoCurso: TiposCurso = new TiposCurso;
  datosSilabo: Datossilabo = new Datossilabo;
  necesidadCurso: NecesidadCurso = new NecesidadCurso;
  disenoCurricular: DisenoCurricular = new DisenoCurricular;
  pcursos: Persona = new Persona;

}