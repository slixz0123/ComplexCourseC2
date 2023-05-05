import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {

    id_usuario?: number;
    username: string = "";
    password: string = ""; 
    enabled?: boolean;

    persona?: Persona;
    rol: Rol = new Rol;
    
  
  }