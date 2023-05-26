import { Especialidad } from "./especialidad";
import { DisenoCurricular } from "./disenoCurricular";
import { Persona } from "./persona";
import { TiposCurso } from "./tipoCurso";
import { ProgramaCapacitacion } from "./programaCapacitacion";
import { ModalidadCurso } from "./modalidadCurso";
import { Datossilabo } from "./DatosSilabo/datosSilabo";
import { NecesidadCurso } from "./necesidadCurso";

export class Curso {

  curId: number = 0;
  curCodigo: String = '';
  curNombre: string = '';
  curFechainicio: Date = new Date();
  curFechafin: Date = new Date();
  curNumhoras: number = 0;
  curProceso: string = '';
  curFoto: string | null = null;
  curEstado: boolean = true;

  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion;
  ecursos: Especialidad = new Especialidad;
  mcursos: ModalidadCurso = new ModalidadCurso;
  tipoCurso: TiposCurso = new TiposCurso;
  datosSilabo: Datossilabo = new Datossilabo;
  necesidadCurso: NecesidadCurso = new NecesidadCurso;
  disenoCurricular: DisenoCurricular = new DisenoCurricular;
  pcursos: Persona = new Persona;

  actualizarProceso(): void {
    const fechaActual = new Date();

    if (fechaActual >= this.curFechainicio && fechaActual <= this.curFechafin) {
      this.curProceso = 'En Proceso';
    } else if (fechaActual > this.curFechafin) {
      this.curProceso = 'Finalizado';
    } else {
      this.curProceso = 'Próximamente';
    }
  }

}
