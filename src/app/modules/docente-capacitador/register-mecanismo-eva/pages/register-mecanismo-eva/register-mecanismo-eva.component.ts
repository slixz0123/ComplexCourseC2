import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MecanismoEvaluacionServService } from 'src/app/shared/Services/mecanismo-evaluacion-serv.service';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoevaluacion';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { DisenoCurricularServService } from 'src/app/shared/Services/disenoCurricular-serv.service';
import Swal from 'sweetalert2';


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

  constructor(private mecanismoEvaluacionServ: MecanismoEvaluacionServService, private disenoServ: DisenoCurricularServService) { }

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

        });
      }
    });

  }

  submitForm(): void {
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
        }
      });
    }
  }

  getDisenos(): void {
    this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}

