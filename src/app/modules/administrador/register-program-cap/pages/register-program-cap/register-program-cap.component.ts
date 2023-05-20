import { Component } from '@angular/core';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
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
  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionService
    
  ){

  }

  ngOnInit(): void {

    this.getAllProgramasc();
  }
  onSubmit() {
    // this.id_programac=(this.programaCapacitacion.pcaId);
    // console.log("esta es "+this.id_programac);
    console.log(this.programaCapacitacion)
    this.programaCapacitacion.pcaEstado=this.estado;
    this.programaCapacitacionServ.createProgramaCapacitacion(this.programaCapacitacion).subscribe(   
      (data: any) => {
        console.log('a verrr' + data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getProgramasCapacitacion().subscribe((data: any) => {
      this.programasList = data;
    });
  }

  editarPrograma(programa: any) {
    console.log(this.programaCapacitacion.pcaFechainicio)
    const fechai = new Date(programa.pcaFechainicio);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechainicio = fechaFormateadai;
    const fechaf = new Date(programa.pcaFechafin);
    const fechaFormateadaf = fechaf.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechafin = fechaFormateadaf;
    this.programaCapacitacion = programa;
  }

  //validaciones
  fechaInicio: Date | undefined; // Variable para almacenar la fecha de inicio
  todosCamposVacios: boolean = true;
  fechaActual: string = new Date().toISOString().split('T')[0];

// Función para verificar si todos los campos están vacíos
verificarCamposVacios() {
  if (
    !this.programaCapacitacion.pcaNombre ||
    !this.programaCapacitacion.pcaFechainicio ||
    !this.programaCapacitacion.pcaFechafin ||
    !this.programaCapacitacion.pcaProceso
  ) {
    this.todosCamposVacios = true; // Todos los campos están vacíos
  } else {
    this.todosCamposVacios = false; // Al menos un campo no está vacío
  }
}



// Función para verificar la fecha de inicio y actualizar la variable correspondiente
verificarFechaInicio() {
  if (this.programaCapacitacion.pcaFechainicio) {
    this.fechaInicio = new Date(this.programaCapacitacion.pcaFechainicio);
  } else {
  }
}

  validar: claseValidaciones = new claseValidaciones();
  validarInputNombre() {
    if (this.programaCapacitacion.pcaNombre != undefined) {
      const valid = this.validar.validarLetras(this.programaCapacitacion.pcaNombre);
      if (valid) {
        this.programaCapacitacion.pcaNombre = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'El nombre solo debe contener letras',
          icon: 'warning',});
      } else {
      }
    }
  }
  
  convertirPrimeraLetraMayuscula() {
    if (this.programaCapacitacion.pcaNombre) {
      const nombre = this.programaCapacitacion.pcaNombre.trim();
      const primeraLetraMayuscula = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      this.programaCapacitacion.pcaNombre = primeraLetraMayuscula;
    }
  }
}


function swal(arg0: string) {
  throw new Error('Function not implemented.');
}

