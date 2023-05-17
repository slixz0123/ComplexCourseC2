import { Persona } from "src/app/Core/models/persona";
import { Curso } from "./curso";
import { Asistencia } from "./asistencia";

export class Participante{
    parId: number = 0;
    parNotaparcial?: number;
    parNotafinal?: number;
    parPromedio?: number;
    parObservacion?: string;
    parEstadoaprovacion?: string;
    parEstado?: boolean;
    parPersona: Persona=new Persona();
    curso?: Curso;
    asistencias!: Asistencia[];

}