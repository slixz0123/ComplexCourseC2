import { Persona } from "src/app/Core/models/persona";
import { Cursos } from "./cursos";

export class Participante{
    parId?: number;
    parNotaparcial?: number;
    parNotafinal?: number;
    parPromedio?: number;
    parObservacion?: string;
    parEstadoaprovacion?: string;
    parEstado?: boolean;
    parPersona?: Persona;
    curso?: Cursos;
}