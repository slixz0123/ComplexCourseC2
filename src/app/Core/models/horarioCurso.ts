import { Horario } from "./horario";
import { Curso } from "./curso";

export class HorarioCurso{
    hcuId: number = 0;
    hcuNombre: string = '';
    hcuEstado: Boolean = true;
    horario: Horario = new Horario;
    hcurso: Curso = new Curso;
}
    
