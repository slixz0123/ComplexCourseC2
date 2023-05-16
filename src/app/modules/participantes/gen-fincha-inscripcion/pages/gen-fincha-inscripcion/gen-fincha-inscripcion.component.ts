import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { participanteService } from 'src/app/shared/Services/participante-serv.service';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';

@Component({
  selector: 'app-gen-fincha-inscripcion',
  templateUrl: './gen-fincha-inscripcion.component.html',
  styleUrls: ['./gen-fincha-inscripcion.component.css']
})
export class GenFinchaInscripcionComponent {
  public persona: Persona = new Persona();
  //Edad de la persona:
  edadPersona: any;
  id_persona: any;
  constructor(
    private personaService: PersonaServService,
    private participanteService: participanteService

  ) {

  }
  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
    this.cursosParticipantepersona();


  }

  public mostrarDatos() {
    this.personaService.getPorId(this.id_persona).subscribe(
      (data: any) => {
        this.persona = data;

        console.log(this.persona);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cursoPartcipanteList: any []=[];
  public cursosParticipantepersona() {
    this.participanteService.cursosPersonaparticipante(this.id_persona).subscribe(
      (data: any) => {
        this.cursoPartcipanteList = data;
        console.log("estos son")
        console.log(this.cursoPartcipanteList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
