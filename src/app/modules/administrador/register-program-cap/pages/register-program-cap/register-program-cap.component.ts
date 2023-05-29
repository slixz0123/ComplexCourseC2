import { Component } from '@angular/core';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-program-cap',
  templateUrl: './register-program-cap.component.html',
  styleUrls: ['./register-program-cap.component.css']
})
export class RegisterProgramCapComponent {
  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion; // instancia de la clase programa Capacitacion
  id_programac: any;
  estado: boolean = true;
  curFechaIValido: boolean = true;
  curFechaFValido: boolean = true;
  curNombreValido: boolean = true;
  procesoValido: boolean = true;

  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionService

  ) {

  }

  ngOnInit(): void {
    this.getAllProgramasc();
  }

  onSubmit() {
    const fechaInicio = new Date(this.programaCapacitacion.pcaFechainicio);
    const fechaFin = new Date(this.programaCapacitacion.pcaFechafin);

    const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
    const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate());

    this.programaCapacitacion.pcaFechafin = fechaInicioUTC;
    this.programaCapacitacion.pcaFechafin = fechaFinUTC;
    const nombreRegex = /^[a-zA-Z0-9\s.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~áéíóúÁÉÍÓÚ]+$/;
    this.curNombreValido = nombreRegex.test(this.programaCapacitacion.pcaNombre);
    // Verificar que la fecha de inicio no sea menor o igual a la fecha actual del sistema
    this.curFechaIValido = new Date(this.programaCapacitacion.pcaFechainicio) > new Date();

    // Verificar que la fecha de fin sea mayor a la fecha de inicio
    this.curFechaFValido = new Date(this.programaCapacitacion.pcaFechafin) > new Date(this.programaCapacitacion.pcaFechainicio);

    if (!this.programaCapacitacion.pcaProceso) {
      this.procesoValido = false;
      return;
    } else {
      this.procesoValido = true;
    }
    if (this.curNombreValido && this.curFechaIValido && this.curFechaFValido && this.procesoValido) {
      this.programaCapacitacion.pcaEstado = this.estado;
      this.programaCapacitacionServ.createProgramaCapacitacion(this.programaCapacitacion).subscribe(
        (data: any) => {
          Swal.fire('¡Éxito!', 'El programa se ha guardado correctamente', 'success')
          this.getAllProgramasc();
          this.programaCapacitacion.pcaNombre = '';
          this.programaCapacitacion.pcaFechainicio = new Date();
          this.programaCapacitacion.pcaFechafin = new Date();
          this.programaCapacitacion.pcaProceso = '';
        },
        (err) => {
        //  console.log(err);
        }
      );
    } else {
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');

    }
    this.getAllProgramasc();
  }
  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getProgramasCapacitacion().subscribe((data: any) => {
      this.programasList = data;
    });
  }

  editarPrograma(programa: any) {
    const fechaInicio = new Date(this.programaCapacitacion.pcaFechainicio);
    const fechaFin = new Date(this.programaCapacitacion.pcaFechafin);

    const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
    const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate());

    this.programaCapacitacion.pcaFechafin = fechaInicioUTC;
    this.programaCapacitacion.pcaFechafin = fechaFinUTC;
    const fechai = new Date(programa.pcaFechainicio);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechainicio = fechaFormateadai;
    const fechaf = new Date(programa.pcaFechafin);
    const fechaFormateadaf = fechaf.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechafin = fechaFormateadaf;
    this.programaCapacitacion = programa;
    this.getAllProgramasc();
  }

}
