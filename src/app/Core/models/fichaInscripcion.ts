import { Curso } from "./curso";

import { Persona } from "./persona";

export class FichaInscripcion{
    finId?: number;
    finAprobacion?: number;
    finInstituciontraest?: string;
    finDireccioninst?: string;
    finCorreoinst?: string;
    finTelefonoinst?: string;
    finActividadinst?: string;
    finAuspiciadoinst?: boolean;
    finNombreauspicia?: string;
    finComoentero?: string;
    finOtroscursosdesea?: string;
    finEstado?: Boolean;
    finPersona: Persona=new Persona();
    finCurso?: Curso;
}