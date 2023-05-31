import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { Persona } from 'src/app/Core/models/persona';
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
  valicreedit: any;
  camp1: boolean = true;
  camp2: boolean = true;
  camp3: boolean = true;
  camp4: boolean = true;
  camp5: boolean = true;
  camp6: boolean = true;
  camp7: boolean = true;
  camp8: boolean = true;
  camp9: boolean = true;
  camp10: boolean = true;


  constructor(
    private personaService: PersonaService,
    private horarioCursoService: HorarioCursoService,
    private cursoService: CursoService,
    private enviarDatosService: EnvioDatosService,
    private fichaincripcionService: FichaIncripcionService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatosp();
    this.verfichaeditar();

  }

  verfichaeditar() {
    if (this.enviarDatosService.idCurso != 0) {
      if (this.enviarDatosService.valid != 0) {
        this.fichaInscripcion = this.enviarDatosService.fichaIncripcion;
        if (this.fichaInscripcion.finAuspiciadoinst != false) {
          this.opcionSeleccionada = 'Sí'
        } else {
          this.opcionSeleccionada = 'No'
        }
        this.mostrarSeleccion();
        this.mostrarDatosc(this.enviarDatosService.idCurso);
        this.enviarDatosService.setIdCurso(0);
        this.valicreedit = 1;
      } else {
        this.mostrarDatosc(this.enviarDatosService.idCurso);
        this.opcionSeleccionada = 'No'
        this.enviarDatosService.setIdCurso(0)
        this.valicreedit = 0;
      }
    }
    else {
      Swal.fire('¡Alerta!', 'Debe seleccionar un curso en el catálogo', 'info');
      this.goTocatprogram();
    }
  }
  public mostrarDatosp() {
    this.personaService.getPorId(this.id_persona).subscribe(
      (data: any) => {
        const fechai = new Date(data.fecha_nacimiento);
        const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
        data.fecha_nacimiento = fechaFormateadai;
        this.persona = data;
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  horarioscursoList: any[] = [];
  public mostrarDatoshc(idCursos: any) {
    this.horarioCursoService.horariobycurso(idCursos).subscribe(
      (data: any) => {
        this.horarioscursoList = data;
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  public mostrarDatosc(idCurso: any) {
    this.cursoService.getById(idCurso).subscribe(
      (data: any) => {
        this.curso = data;
        this.mostrarDatoshc(this.curso.curId)
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  filtrarNumeros(event: any) {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
    // Verificar si la longitud del número después de filtrar es mayor a 9
    if (numericInput.length > 9) {
      // Obtener solo los primeros 9 dígitos del número
      const formattedInput = numericInput.substr(0, 9);
      // Aplicar el formato deseado al número telefónico
      const formattedNumber = `(${formattedInput.substr(0, 2)})${formattedInput.substr(2, 3)}-${formattedInput.substr(5, 4)}`;
      event.target.value = formattedNumber;
    } else {
      // Aplicar el formato solo si hay algún número ingresado
      if (numericInput.length > 0) {
        const formattedNumber = `(${numericInput.substr(0, 2)})${numericInput.substr(2, 3)}-${numericInput.substr(5, 4)}`;
        event.target.value = formattedNumber;
      } else {
        event.target.value = '';
      }
    }

    // Actualizar el valor en la propiedad fichaInscripcion.finTelefonoinst
    this.fichaInscripcion.finTelefonoinst = event.target.value;
  }
  opcionSeleccionada: any;
  mostrarSeleccion() {
    // this.opcionSeleccionada = this.fichaInscripcion.finAuspiciadoinst;
    // console.log(this.opcionSeleccionada)
    if (this.opcionSeleccionada != 'No') {
      this.fichaInscripcion.finAuspiciadoinst = true;
    } else {
      this.fichaInscripcion.finAuspiciadoinst = false;
    }
  }

  guardarFichaIncripcion(mfichaInscripcion: FichaInscripcion) {
    // console.log(this.fichaInscripcion.finAuspiciadoinst)
    // Validación de datos
    const campo1Regex = /^(?=.*[A-Za-z])[0-9A-Za-z\s.\u00f1\u00d1áéíóúÁÉÍÓÚ]+$/u;
    this.camp1 = campo1Regex.test(this.fichaInscripcion.finInstituciontraest);
    const campo2Regex = /^(?=.*[A-Za-z])[0-9A-Za-z\s\u00f1\u00d1áéíóúÁÉÍÓÚ.-]+$/u;
    this.camp2 = campo2Regex.test(this.fichaInscripcion.finDireccioninst);
    const correoRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|tecazuay\.edu\.ec)$/;
    this.camp3 = correoRegex.test(this.fichaInscripcion.finCorreoinst);
    const telefonoRegex = /^\(\d{2}\)\d{3}-\d{4}$/;
    this.camp4 = telefonoRegex.test(this.fichaInscripcion.finTelefonoinst);
    this.camp5 = campo1Regex.test(this.fichaInscripcion.finActividadinst);
    if (this.fichaInscripcion.finAuspiciadoinst != true) {
      this.fichaInscripcion.finNombreauspicia = 'N/a'
      this.camp7 = true;
    } else {
      this.camp7 = campo1Regex.test(this.fichaInscripcion.finNombreauspicia);
    }
    this.camp8 = campo1Regex.test(this.fichaInscripcion.finComoentero);
    this.camp9 = campo1Regex.test(this.fichaInscripcion.finOtroscursosdesea);
    if (this.horarioCurso.hcuId != 0) {
      this.camp10 = true;
    } else {
      this.camp10 = false;
    }
    if (this.camp1 && this.camp2 && this.camp3 && this.camp4 && this.camp5 && this.camp6 && this.camp7 && this.camp8 && this.camp9 && this.camp10) {
      // console.log("bien pero maso")
      if (this.valicreedit != 0) {
        Swal.fire({
          icon: 'warning',
          title: '¿Está seguro?',
          text: '¿Desea editar la ficha de inscripción?',
          showCancelButton: true,
          confirmButtonText: 'Editar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            mfichaInscripcion.finHorario = this.horarioCurso;
            this.fichaincripcionService.updateFichaIncripcion(mfichaInscripcion.finId, mfichaInscripcion).subscribe(() => {
              Swal.fire('¡Éxito!', 'La ficha de inscripción se ha actualizado exitosamente.', 'success');
              this.goTo_gen_ficha();
            }, error => {
              Swal.fire('¡Error!', 'Ha ocurrido un error al actualizar la ficha de inscripción. Por favor, inténtelo de nuevo más tarde.', 'error');
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
          }
        });
      } else {
        mfichaInscripcion.finEstado = true;
        mfichaInscripcion.finAprobacion = 0;
        mfichaInscripcion.finCurso = this.curso;
        mfichaInscripcion.finPersona = this.persona;
        mfichaInscripcion.finId = 0;
        mfichaInscripcion.finHorario = this.horarioCurso;
        this.fichaincripcionService.saveFichaIncripcion(mfichaInscripcion).subscribe(() => {
          // console.log("Afirmativo pareja")
          Swal.fire('¡Éxito!', 'La ficha de inscripción se ha guardado exitosamente, puedes imprimir la ficha en el módulo "Generar ficha incripción"', 'success');
          this.goTo_gen_ficha();
        }, error => {
          Swal.fire('¡Error!', 'Ha ocurrido un error al guardar la ficha de inscripción. Por favor, inténtelo de nuevo más tarde.', 'error');
        });
      }
    }
    else {
      Swal.fire('¡Error!', 'Se debe llenar todos los campos', 'error');

    }

  }
  goTo_gen_ficha(): void {

    this.router.navigate(['/Participante/gen-ficha-inscripcion'])

  }
  goTocatprogram(): void {

    this.router.navigate(['/Participante/programas-capacitacion'])

  }
}
