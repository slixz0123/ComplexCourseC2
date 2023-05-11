import { Curso } from './curso';

export class FichaEvaluacion {
  fevId: number = 0;
  fevNombre: string= '';
  fevEstado?: boolean;
  fevCurso?: Curso;
}