import { TiposCurso } from "./tiposcurso";
import { Modalidadcurso } from "./modalidadcurso";

export class Curso{
    curId?: number;
    curCodigo?: string;
    curNombre?: string;
    curFechainicio?: Date;
    curFechafin?: Date;
    curNumhoras?: number;
    curProceso?: string;
    curEstado?: Boolean;
    
    tipocurso: TiposCurso = new TiposCurso; //id_persona herencia
    mcursos: Modalidadcurso = new Modalidadcurso; //id_persona herencia
}