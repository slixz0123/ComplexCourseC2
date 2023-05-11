import { Curso } from "./curso";

export class AsistenciaCurso{
    acuId?: number;
    acuObservacion?: string;
    acuFechaelaboracion?: Date;
    acuEstado?: Boolean;
    curso?: Curso;
}