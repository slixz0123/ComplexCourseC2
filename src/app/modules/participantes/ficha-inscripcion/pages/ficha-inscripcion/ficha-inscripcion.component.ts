import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/FichaInscripcion';
import { HorarioCurso } from 'src/app/Core/models/HorarioCurso';
import { Persona } from 'src/app/Core/models/persona';
import { CursoServ } from 'src/app/shared/Services/curso-serv.service';
import { EnvioDatosService } from 'src/app/shared/Services/envioDatos-serv.service';
import { FichaIncripcionServ } from 'src/app/shared/Services/fichaIncripcion-serv.service';
import { HorarioCursoServ } from 'src/app/shared/Services/horarioCurso-serv.service';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';

@Component({
  selector: 'app-ficha-inscripcion',
  templateUrl: './ficha-inscripcion.component.html',
  styleUrls: ['./ficha-inscripcion.component.css']
})
export class FichaInscripcionComponent {
  public persona: Persona = new Persona();
  public horarioCurso: HorarioCurso = new HorarioCurso();
  public curso: Curso = new Curso();
  public fichaInscripcion: FichaInscripcion = new FichaInscripcion();

  id_persona: any;
  idCurso: any;


  constructor(
    private personaService: PersonaServService,
    private horarioCursoService: HorarioCursoServ,
    private cursoService: CursoServ,
    private enviarDatosService: EnvioDatosService,
    private fichaincripcionService: FichaIncripcionServ 

    ){}

  ngOnInit(  ): void {
      this.id_persona = localStorage.getItem('id_persona');
      this.mostrarDatosp();
      this.mostrarDatosc();
      this.mostrarDatoshc();
this.fichaInscripcion.finAuspiciadoinst=true
  }
  // showContainer1: boolean = true;
  // mostrarSegundoDiv = false;
  // onAuspicioChange() {
  //   this.mostrarSegundoDiv = this.fichaInscripcion.finAuspiciadoinst;
  // }
  public mostrarDatosp(){
    this.personaService.getPorId(2).subscribe(
        (data: any) => {
          const fechai = new Date(data.fecha_nacimiento);
          const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
          data.fecha_nacimiento = fechaFormateadai;
          this.persona = data;
          console.log(this.persona);
        },
      (err) => {
        console.log(err);
      }
    );
  }
  horarioscursoList: any[] = [];
  public mostrarDatoshc(){
    this.horarioCursoService.horariobycurso(this.enviarDatosService.idCurso).subscribe(
        (data: any) => {
          this.horarioscursoList = data;
        
          console.log(this.horarioscursoList);
        },
      (err) => {
        console.log(err);
      }
    );
  }

  public mostrarDatosc(){
    this.cursoService.getCursoById(this.enviarDatosService.idCurso).subscribe(
        (data: any) => {
         this.curso = data;
        //  console.log(this.curso.modalidadcurso.mcuNombre)
          console.log(this.curso);
        },
      (err) => {
        console.log(err);
      }
    );
  }

  guardarFichaIncripcion(mfichaInscripcion: FichaInscripcion){
    mfichaInscripcion.finEstado = true;
    mfichaInscripcion.finAprobacion = 0;
    mfichaInscripcion.finCurso=this.curso;
    mfichaInscripcion.finPersona=this.persona;
    mfichaInscripcion.finId=0;

      console.log("mi ficha");
      console.log(mfichaInscripcion);
      console.log(mfichaInscripcion.finAuspiciadoinst);
  console.log("esta es la fi")
  console.log(mfichaInscripcion)

    this.fichaincripcionService.saveFichaIncripcion(mfichaInscripcion).subscribe(() => {
      console.log("Afirmativo pareja")

      alert("La ficha de inscripción se ha guardado exitosamente.");
    }, error => {
      alert("Ha ocurrido un error al guardar la ficha de inscripción. Por favor, inténtelo de nuevo más tarde.");
    });
  }
}
