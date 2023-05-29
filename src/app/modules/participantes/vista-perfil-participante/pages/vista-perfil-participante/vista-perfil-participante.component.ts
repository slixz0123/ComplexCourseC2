import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Core/models/persona';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-vista-perfil-participante',
  templateUrl: './vista-perfil-participante.component.html',
  styleUrls: ['./vista-perfil-participante.component.css']
})
export class VistaPerfilParticipanteComponent {
  public persona: Persona = new Persona();
  //Edad de la persona:
  edadPersona: any;
  id_persona: any;
  constructor(
    private personaService: PersonaService,
    private participanteService: ParticipanteService,
    private router : Router


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

        // console.log(this.persona);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  cursoPartcipanteList: any []=[];
  public cursosParticipantepersona() {
    this.participanteService.cursosPersonaparticipante(this.id_persona).subscribe(
      (data: any) => {
        this.cursoPartcipanteList = data;
     //   console.log(this.cursoPartcipanteList);
      },
      (err) => {
   //     console.log(err);
      }
    );
  }
  goToeditprofile($event: any) :void{

    this.router.navigate(['Participante/edit-dts-participante'])
 //   console.log($event)
   }
}
