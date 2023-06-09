import { Persona } from "src/app/Core/models/persona";
import { Curso } from "./curso";
import { Asistencia } from "./asistencia";
import { HorarioCurso } from "./horarioCurso";

export class Participante{
    parId: number = 0;
    parNotaparcial?: number;
    parNotafinal?: number;
    parPromedio?: number;
    parObservacion?: string;
    parEstadoaprovacion?: string;
    parEstado?: boolean;
    parPersona?: Persona;
    parCurso?: Curso;
    asistencias!: Asistencia[];
    parHorario?:HorarioCurso;
}