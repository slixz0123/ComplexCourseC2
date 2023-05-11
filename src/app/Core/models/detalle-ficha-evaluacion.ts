import { FichaEvaluacion } from './ficha-evaluacion';

export class DetalleFichaevaluacion {
  dfeId: number =0 ;
  dfePregunta: string = '';
  dfeCalificacion: string= '';
  dfeEstado?: boolean ;
  fichaEvaluacion?: FichaEvaluacion;
}