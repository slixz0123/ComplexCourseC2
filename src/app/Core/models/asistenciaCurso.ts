import { Curso } from "./curso";

export class AsistenciaCurso {
    acuId?: number;
    acuObservacion: string="";
    acuFechaelaboracion: Date= new Date();
    acuEstado: Boolean=false;
    acuCurso?: Curso;
}