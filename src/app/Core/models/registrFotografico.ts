import { Curso } from './curso';

export class RegistroFotografico {
  rfoId: number=0;
  rfoNumero: number=0;
  rfoDescripcion: string='';
  rfoFecha: Date = new Date();
  rfoEstado: boolean=false;
  rfoFoto: string ='';
  rfoCurso: any = Curso;

}
