import { Curso } from "./curso";
import { HorarioCurso } from "./horarioCurso";

import { Persona } from "./persona";

export class FichaInscripcion{
    finId: number=0;
    finAprobacion: number=0;
    finInstituciontraest: string='';
    finDireccioninst: string='';
    finCorreoinst: string='';
    finTelefonoinst: string='';
    finActividadinst: string='';
    finAuspiciadoinst: boolean=false;
    finNombreauspicia: string='';
    finComoentero: string='';
    finOtroscursosdesea: string='';
    finEstado: Boolean=true;
    finPersona: Persona = new Persona;
    finCurso: Curso = new Curso;
    finHorario:HorarioCurso = new HorarioCurso;
}