import { Curso } from "./curso";

export class InformeFinal{
    ifiId?: number;
    ifiObservaciones: string=" ";
    ifiFecha : Date = new Date();
    ifiEstado: Boolean =true;
    ifiCurso?: Curso;

}