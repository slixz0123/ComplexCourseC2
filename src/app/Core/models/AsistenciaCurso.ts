import { Curso } from "./Curso";

export class AsistenciaCurso{
    acuId?: number;
    acuObservacion?: string;
    acuFechaelaboracion?: Date;
    acuEstado?: Boolean;
    curso?: Curso;
}