import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {

    id_usuario?: number;
    username: string = "";
    password: string = ""; 
    enabled?: boolean;

  persona?: Persona;
  rol2?: Rol;

  rol: Rol = new Rol;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}

