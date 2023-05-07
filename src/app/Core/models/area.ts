import { Especialidad } from "./especialidad";
import { Persona } from "./persona";
import { Rol } from "./rol";

export class Area {

    areId: number =0;
    areCodigo: string = "";
    areNombre!: string; 
    areEstado?: boolean = true;   
    
    especialidades?: Especialidad[];
  
    
  }