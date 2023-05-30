import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Persona } from 'src/app/Core/models/persona';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { EnvioDatosService } from 'src/app/shared/Services/envioDatos.service';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-programas-capacitacion',
  templateUrl: './visualizar-programas-capacitacion.component.html',
  styleUrls: ['./visualizar-programas-capacitacion.component.css']
})
export class VisualizarProgramasCapacitacionComponent {
  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();
  nprogramaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();
  persona: Persona = new Persona();
  curso: Curso = new Curso();
  ncurso: Curso = new Curso();
  id_persona: any;




  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionService,
    private horarioCursoService: HorarioCursoService,
    private enviarDatosService: EnvioDatosService,
    private cursoService: CursoService,
    private fichainscripcionService: FichaIncripcionService,
    private personaService: PersonaService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.getAllProgramasc();

  }

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;



  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getProgramasCapacitacion().subscribe((data: any) => {

      // Filtrar los datos por estado diferente a falso
      this.programasList = data.filter((programaCapacitacion: ProgramaCapacitacion) => programaCapacitacion.pcaEstado != false);
    });
  }
  cursosList: any[] = [];
  mostrarCursos(miPrograma: ProgramaCapacitacion) {
    this.cursoService.cursosporPrograma(miPrograma.pcaId).subscribe((data: any) => {
      this.cursosList = data;
    });
  }
  cuposdisponibles: any;
  cupos: any;
  fichasList: any[] = [];
  mostrarDatosCurso(mcurso: Curso) {
    this.fichainscripcionService.FichasPorCurso(mcurso.curId).subscribe((data: any) => {
      this.fichasList = data.filter((ficha: FichaInscripcion) => ficha.finAprobacion == 1);
      this.curso = mcurso;
      this.cupos = this.curso.necesidadCurso.ncuNumparticipantes;
      // Contar fichas aprobadas
      const numFichasAprobadas = this.fichasList.length;
      // Calcular cupos disponibles
      this.cuposdisponibles = this.cupos - numFichasAprobadas;
      
      this.mostrarDatoshc();
    });
  }


  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc() {
    this.horarioCursoService.horariobycurso(this.curso.curId).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
        this.horariosTexto = "";
        for (let hc of this.horarioscursoList) {
          this.numr = +1;
          this.horariosTexto += `${hc.horario.horInicio} - ${hc.horario.horFin}\n`;
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }
  fichaIncripcion: FichaInscripcion = new FichaInscripcion();
  public validarInscripcion(idCurso: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.fichainscripcionService.getFichabycursopersona(idCurso, this.id_persona).subscribe((data: any) => {
        if (data != null) {
          this.fichaIncripcion = data;
          resolve(1);
        } else {
          resolve(0);
        }
      }, (error: any) => {
        reject(error);
      });
    });
  }
  vali: any = 0;
  goTogenfichains($event: any, idCurso: any): void {
    this.validarInscripcion(idCurso)
      .then((resultado: number) => {
        if (resultado == 0) {
          this.enviarDatosService.setIdCurso(idCurso);
          this.enviarDatosService.setvalid(0);
          this.router.navigate(['/Participante/ficha-inscripcion']);
        } else {
          Swal.fire('¡Alerta!', 'Usted ya llenó la ficha de inscripción, puede ver el estado de su ficha en cursos aplicados', 'info');
        }
      })
      .catch((error: any) => {
        //console.error(error);
      });
  }
  public mostrarDatosdocete(idDocente: any) {
    this.personaService.getPorId(idDocente).subscribe(
      (data: any) => {
        this.persona = data;
        this.mostrarCursosDocente(idDocente)
      },
      (err) => {
        //console.log(err);
      }
    );
  }
  cursoList: any[] = [];
  public mostrarCursosDocente(idDocente: any) {
    this.cursoService.cursosporDocente(idDocente).subscribe(
      (data: any) => {
        this.cursoList = data;

        //console.log(this.cursoList);
      },
      (err) => {
        //console.log(err);
      }
    );
  }


  // fichaIncripcion: FichaInscripcion = new FichaInscripcion();
  // public ValidarInscripcion(idCurso: any): number {
  //   //console.log(idCurso, this.id_persona);
  //   this.fichainscripcionService.getFichabycursopersona(idCurso, this.id_persona).subscribe((data: any) => {
  //     if (null != data) {
  //       this.fichaIncripcion = data;
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }


  // goTogenfichains($event: any, idCurso: any): void {
  //   if (this.ValidarInscripcion(idCurso) == 0) {
  //     this.enviarDatosService.setIdCurso(idCurso);
  //     this.router.navigate(['/Participante/ficha-inscripcion'])
  //     //console.log($event)
  //   } else{
  //     Swal.fire('¡Alerta!', 'Usted ya lleno la ficha de incripción, La cual ya fue aceptada', 'info'); // 
  //   }
  // }
}
