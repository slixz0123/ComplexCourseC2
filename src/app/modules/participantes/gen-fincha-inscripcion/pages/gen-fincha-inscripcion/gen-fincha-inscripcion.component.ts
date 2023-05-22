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
export class GenFinchaInscripcionComponent {
<<<<<<< Updated upstream
 
=======
  public persona: Persona = new Persona();
  public curso: Curso = new Curso();
  public fichaInscripcion = new FichaInscripcion();
  //Edad de la persona:
  edadPersona: any;
  id_persona: any;
  curId: any;
  constructor(
    private personaService: PersonaService,
    private participanteService: ParticipanteService,
    private fichainscripcionService: FichaIncripcionService
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

  public imprimirFichaInscripcion(curso: Curso) {
    const curId = curso.curId;
    this.fichaInscripcionPorCurso(curId).subscribe((ficha: FichaInscripcion) => {
      this.fichainscripcionService.printFichaInscripcion(ficha).subscribe((data: Blob) => {
        const url = URL.createObjectURL(data);

        // Crear un enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'fichaInscripcion.pdf';

        // Agregar el enlace al DOM y hacer clic en él
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Limpiar y revocar el objeto URL creado
        URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      });
    });
  }

  public fichaInscripcionPorCurso(curId: any) {
    return this.fichainscripcionService.getFichaIncripcionByCurId(curId);
  }
>>>>>>> Stashed changes
}
