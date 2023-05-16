import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'bootstrap';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoEvaluacion';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { MecanismoEvaluacionService } from 'src/app/shared/Services/mecanismoEvaluacion.service';
import Swal from 'sweetalert2';
import { DetalleMevaService } from 'src/app/shared/Services/detalleMeva.service';


@Component({
  selector: 'app-register-detalle-meva',
  templateUrl: './register-detalle-meva.component.html',
  styleUrls: ['./register-detalle-meva.component.css']
})
export class RegisterDetalleMevaComponent {

  mecanismos: MecanismoEvaluacion[] = [];
  detalleSeleccionado: DetalleMe = new DetalleMe();
  detalles: DetalleMe[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  detalleForm: FormGroup | undefined;
  submitted = false;
  selectedMecanismo!: MecanismoEvaluacion;

  constructor(private detalleMevaServService: DetalleMevaService, private mecanismoServ: MecanismoEvaluacionService) { }

  ngOnInit(): void {
    this.getMecanismos();
    this.getDetalles();
  }

  getDetalles(): void {
    this.detalleMevaServService.getAllTrue().subscribe((detalles) => (this.detalles = detalles));
  }

  editarDetalle(detalle: DetalleMe): void {
    this.detalleSeleccionado = Object.assign({}, detalle);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarDetalle(detalle: DetalleMe): void {
    this.detalleSeleccionado = Object.assign({}, detalle);
  }

  submitForm(): void {
    if (this.isNew) {
      this.detalleMevaServService.create(this.detalleSeleccionado).subscribe(() => {
        this.getDetalles();
        this.detalleSeleccionado = new DetalleMe();

        Swal.fire({
          icon: 'success',
          title: 'Detale creado',
          text: 'El detalle del mecanismo de evaluación ha sido registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar este detalle del mecanismo de evaluación?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma la edición
          this.detalleMevaServService.update(this.detalleSeleccionado, this.detalleSeleccionado.dmeId).subscribe(() => {
            this.getDetalles();
            this.detalleSeleccionado = new DetalleMe();
            this.isNew = true;

            Swal.fire({
              icon: 'success',
              title: 'Detalle editado',
              text: 'El detalle del mecanismo de evaluación ha sido modificado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          });
        }
      });
    }
  }


  eliminarDetalle(dmeId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este detalle?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleMevaServService.delete(dmeId).subscribe(() => {
          this.getDetalles();

        });
      }
    });

  }

  getMecanismos(): void {
    this.mecanismoServ.getMecanismosTrue().subscribe((mecanismos) => (this.mecanismos = mecanismos));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
