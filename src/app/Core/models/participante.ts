import { Asistencia } from "./asistencia";
import { Persona } from "./persona";

export class Participante {
  parId: number = 0;
  parNotaparcila: number = 0;
  parNotafinal: number = 0;
  parPromedio: number = 0;
  parObservacion: string = '';
  parEstadoaprovacion: string = '';
  parEstado: boolean = true;
  parPersona: Persona = new Persona;
  //parCurso: Curso;
  //entregaCertificados: EntregaCertificado[];
  asistencias!: Asistencia[];
}