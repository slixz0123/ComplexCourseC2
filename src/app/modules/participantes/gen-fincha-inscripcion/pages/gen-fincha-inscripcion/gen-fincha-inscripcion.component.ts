import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Persona } from 'src/app/Core/models/persona';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gen-fincha-inscripcion',
  templateUrl: './gen-fincha-inscripcion.component.html',
  styleUrls: ['./gen-fincha-inscripcion.component.css']
})
export class GenFinchaInscripcionComponent {}