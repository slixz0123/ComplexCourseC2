import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { Persona } from 'src/app/Core/models/persona';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { EnvioDatosService } from 'src/app/shared/Services/envioDatos.service';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import Swal from 'sweetalert2';

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
    private personaService: PersonaService,
    private horarioCursoService: HorarioCursoService,
    private cursoService: CursoService,
    private enviarDatosService: EnvioDatosService,
    private fichaincripcionService: FichaIncripcionService

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
    this.cursoService.getById(this.enviarDatosService.idCurso).subscribe(
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

  todosCamposVacios: boolean = true;
  validar: claseValidaciones = new claseValidaciones();
  validarNombre(){
    if (this.fichaInscripcion.finInstituciontraest) {
      const valid = this.validar.validarLetras(this.fichaInscripcion.finInstituciontraest);
      if (valid) {
        this.fichaInscripcion.finInstituciontraest = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'Este campo solo debe contener letras',
          icon: 'warning',});
      } else {
      }
    }
  }

  validarCorreo(){
    if (this.fichaInscripcion.finCorreoinst) {
      const valid = this.validar.validarEmail(this.fichaInscripcion.finCorreoinst);
      if (!valid) {
        this.fichaInscripcion.finCorreoinst = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'El correo no cumple las características',
          icon: 'warning',});
      } else {
      }
    }
  }

  validarTelf(){
    if (this.fichaInscripcion.finTelefonoinst) {
      const valid = this.validar.validarSoloNumeros(this.fichaInscripcion.finTelefonoinst);
      if (valid) {
        this.fichaInscripcion.finTelefonoinst = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'El telefono solo contiene numeros',
          icon: 'warning',});
      } else {
      }
    }
  }
  
  convertirPrimeraLetraNombre() {
    if (this.fichaInscripcion.finInstituciontraest) {
      const nombre = this.fichaInscripcion.finInstituciontraest.trim();
      const palabras = nombre.split(' ');
      const palabrasCapitalizadas = palabras.map(palabra => {
        const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
        return primeraLetraMayuscula;
      });
      const resultado = palabrasCapitalizadas.join(' ');
      this.fichaInscripcion.finInstituciontraest = resultado;
    }
  }

  verificarCamposVacios() {
    if (
      !this.fichaInscripcion.finInstituciontraest || !this.fichaInscripcion.finDireccioninst || !this.fichaInscripcion.finCorreoinst ||
      !this.fichaInscripcion.finTelefonoinst ||
      !this.fichaInscripcion.finActividadinst ||
      !this.fichaInscripcion.finAuspiciadoinst|| !this.fichaInscripcion.finComoentero || !this.fichaInscripcion.finOtroscursosdesea
    ) {
      this.todosCamposVacios = true; 
    } else {
      this.todosCamposVacios = false; 
    }
  }
}
