import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MecanismoEvaluacionService } from 'src/app/shared/Services/mecanismoEvaluacion.service';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoEvaluacion';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import Swal from 'sweetalert2';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';


@Component({
  selector: 'app-register-mecanismo-eva',
  templateUrl: './register-mecanismo-eva.component.html',
  styleUrls: ['./register-mecanismo-eva.component.css']
})
export class RegisterMecanismoEvaComponent {
  
  mecanismos: MecanismoEvaluacion[] = [];
  mecanismoSeleccionado: MecanismoEvaluacion = new MecanismoEvaluacion();
  disenos: DisenoCurricular[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  mecanismoForm: FormGroup | undefined;
  submitted = false;
  disenoSeleccionadoValido: boolean = true;
  mevDescripcionValido: boolean = true;
  filtro = '';

  constructor(private mecanismoEvaluacionServ: MecanismoEvaluacionService, private disenoServ: DisenoCurricularService) { }

  ngOnInit(): void {
    this.getMecanismos();
    this.getDisenos();
  }

  getMecanismos(): void {
    this.mecanismoEvaluacionServ.getMecanismosTrue().subscribe((mecanismos) => (this.mecanismos = mecanismos));
  }

  editarMecanismo(mecanismo: MecanismoEvaluacion): void {
    this.mecanismoSeleccionado = Object.assign({}, mecanismo);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarMecanismo(mecanismo: MecanismoEvaluacion): void {
    this.mecanismoSeleccionado = Object.assign({}, mecanismo);
  }

  eliminarMecanismo(mevId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este mecanismo de evaluación?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mecanismoEvaluacionServ.deleteMecanismo(mevId).subscribe(() => {
          this.getMecanismos();
          Swal.fire('¡Éxito!', 'El mecanismo de evaluación ha sido eliminado correctamente', 'success');
        });
      }
    });

  }

  submitForm(): void {
    // Validación de selección de diseño curricular
    if (!this.mecanismoSeleccionado.mevDiseno || !this.mecanismoSeleccionado.mevDiseno.dcuId) {
      this.disenoSeleccionadoValido = false;
      return;
    } else {
      this.disenoSeleccionadoValido = true;
    }

    // Validación de descripción
    const descripcionRegedex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;

    if (!this.mecanismoSeleccionado.mevDescripcion || !descripcionRegedex.test(this.mecanismoSeleccionado.mevDescripcion)) {
      this.mevDescripcionValido = false;
      
        Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
      
      return;
    } else {
      this.mevDescripcionValido = true;
      
    }

    if (this.isNew) {
      this.mecanismoEvaluacionServ.saveMecanismo(this.mecanismoSeleccionado).subscribe(() => {
        this.getMecanismos();
        this.mecanismoSeleccionado = new MecanismoEvaluacion();

        Swal.fire({
          icon: 'success',
          title: 'Mecanismo de evaluación creado',
          text: 'El mecanismo de evaluación ha sido registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar este mecanismo de evaluación?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        // Validación de selección de diseño curricular
        if (!this.mecanismoSeleccionado.mevDiseno || !this.mecanismoSeleccionado.mevDiseno.dcuId) {
          this.disenoSeleccionadoValido = false;
          
            Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
          
          return;
        }

        // Validación de descripción
        if (!this.mecanismoSeleccionado.mevDescripcion || !descripcionRegedex.test(this.mecanismoSeleccionado.mevDescripcion)) {
          this.mevDescripcionValido = false;
          return;
        }

        if (result.isConfirmed) { // Si el usuario confirma la edición
          this.mecanismoEvaluacionServ.updateMecanismo(this.mecanismoSeleccionado, this.mecanismoSeleccionado.mevId).subscribe(() => {
            this.getMecanismos();
            this.mecanismoSeleccionado = new MecanismoEvaluacion();
            this.isNew = true;

            Swal.fire({
              icon: 'success',
              title: 'Mecanismo de evaluación editado',
              text: 'El mecanismo de evaluación ha sido modificado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.mecanismoSeleccionado = new MecanismoEvaluacion();
          this.isNew = true;
        }
      });
    }
  }

  getDisenos(): void {
    this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}

