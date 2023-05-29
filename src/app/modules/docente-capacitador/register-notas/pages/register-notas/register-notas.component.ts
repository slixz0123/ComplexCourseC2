import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-notas',
  templateUrl: './register-notas.component.html',
  styleUrls: ['./register-notas.component.css']
})
export class RegisterNotasComponent {
  curso: Curso = new Curso; // instancia de la clase asistencia curso
  idPersona: any;
  estado: boolean = true;
  participante: Participante = new Participante;



  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;
  showContainer4: boolean = false;

  constructor(
    private cursoService: CursoService,
    private participanteService: ParticipanteService,
    private horarioCursoService: HorarioCursoService,
  ) {

  }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
    // this.mostrarParticipante(1)
  }
  cursosList: any[] = [];
  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter((curso: Curso) => curso.curProceso !== 'Finalizado');
    });
  }
  participantesList: any[] = [];
  mostrarParticipante(idCurso: any, idHorario: any) {
    this.participanteService.ParticipantesPorhorarioc(idCurso, idHorario).subscribe((data: any) => {
      this.participantesList = data;
    });
    // this.mostrarDatoshc(idCurso)

  }

  horariosTexto: string = '';
  horarioscursoList: any[] = [];
  numr: any;
  public mostrarDatoshc(idCurso: any) {
    this.horarioCursoService.horariobycurso(idCurso).subscribe(
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
  notaPrimer: boolean = true;
  notafinal: boolean = true;
  promedio: boolean = true;
  observacion: boolean = true;
  estadoa: boolean = true;


  filtrarNumeros(event: any, num: any) {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
    const decimalSeparator = '.'; // Separador decimal deseado

    // Verificar si la longitud del número después de filtrar es mayor a 6 (incluyendo coma y dos decimales)
    if (numericInput.length > 5) {
      // Obtener solo los primeros 6 dígitos del número (incluyendo coma y dos decimales)
      const formattedInput = numericInput.substr(0, 5);
      // Dividir la cadena en partes (parte entera y parte decimal)
      const integerPart = formattedInput.substr(0, formattedInput.length - 2);
      const decimalPart = formattedInput.substr(formattedInput.length - 2);
      // Crear la cadena con el formato deseado (con coma y dos decimales)
      const formattedNumber = `${integerPart}${decimalSeparator}${decimalPart}`;
      event.target.value = formattedNumber;
    } else {
      // Aplicar el formato solo si hay algún número ingresado
      if (numericInput.length > 0) {
        // Dividir la cadena en partes (parte entera y parte decimal)
        const integerPart = numericInput.substr(0, numericInput.length - 2);
        const decimalPart = numericInput.substr(numericInput.length - 2);
        // Crear la cadena con el formato deseado (con coma y dos decimales)
        const formattedNumber = `${integerPart}${decimalSeparator}${decimalPart}`;
        event.target.value = formattedNumber;
      } else {
        event.target.value = '';
      }
    }

    // Actualizar el valor en la propiedad participante.parNotaparcial
    if (num == 1) {
      this.participante.parNotaparcial = event.target.value;
    } else if (num == 2) {
      this.participante.parNotafinal = event.target.value;
    } else {
      this.participante.parPromedio = event.target.value;
    }
  }

  savenotas(participante: any) {
    const notaRegex = /^100(?:\.0{1,2})?$|^([1-9]?\d(?:\.\d{1,2})?)?$/;
    if (notaRegex.test(participante.parNotaparcial)) {
      // El valor cumple con la validación
      this.notaPrimer = true;
    } else {
      // El valor no cumple con la validación
      this.notaPrimer = false;
    }
    if (notaRegex.test(participante.parNotafinal)) {
      // El valor cumple con la validación
      this.notafinal = true;
    } else {
      // El valor no cumple con la validación
      this.notafinal = false;
    }
    if (notaRegex.test(participante.parPromedio)) {
      // El valor cumple con la validación
      this.promedio = true;
    } else {
      // El valor no cumple con la validación
      this.promedio = false;
    }
    const campo2Regex = /^(?=.*[A-Za-z])[0-9A-Za-z\s.-]+$/;
    this.observacion=campo2Regex.test(participante.parObservacion);
    if(participante.parEstadoaprovacion!=" "){
      this.estadoa=true;
    }else{
      this.estadoa=false;
    }
    
    if(this.notaPrimer && this.notafinal && this.promedio && this.observacion && this.estadoa){

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      text: '¿Desea editar las notas del estudiante?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participanteService.updateparticipante(participante.parId, participante).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'Las notas se actualizaron correctamente.', 'success');
            const participantev: Participante = new Participante();
            this.participante=participantev;
          },
          (err) => {
            //console.log(err);
            Swal.fire('¡Error!', 'Ha ocurrido un error al actualizar las notas del estudiante. Por favor, inténtelo de nuevo más tarde.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
        const participantev: Participante = new Participante();
        this.participante=participantev;
      }
    });}else{
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
      
    }
  }

  editarNotas(participnated: any) {
    this.participante = participnated

  }
}
