import { Persona } from './persona';
export class SignupRequest {
  username: string = '';
  persona_id?: number;
  password: string = '';
  enable: boolean = true;
  roles: string = '';
  persona: Persona = new Persona(); // Agregar la propiedad persona de tipo Persona

  // Resto de propiedades de SignupRequest
}

