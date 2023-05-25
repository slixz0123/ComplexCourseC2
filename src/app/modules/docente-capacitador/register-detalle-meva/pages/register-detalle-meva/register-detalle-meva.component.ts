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
  mecanismoValido: boolean = true;
  dmeInstrumentoValido: boolean = true;
  dmeTecnicaValido: boolean = true;
  filtro = '';

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

    const tecnicaRegex = /^[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.dmeTecnicaValido = tecnicaRegex.test(this.detalleSeleccionado.dmeTecnica);

    const instrumentoRegex = /^[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.dmeInstrumentoValido = instrumentoRegex.test(this.detalleSeleccionado.dmeInstrumento);

    // Validación de selección de mecanismo de evaluación
    if (!this.detalleSeleccionado.mecanismoEvaluacion || !this.detalleSeleccionado.mecanismoEvaluacion.mevId) {
      this.mecanismoValido = false;
      return;
    } else {
      this.mecanismoValido = true;
    }
    if (this.dmeTecnicaValido && this.dmeInstrumentoValido) {
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
          // Validación de selección de mecanismo de evaluación
          if (!this.detalleSeleccionado.mecanismoEvaluacion || !this.detalleSeleccionado.mecanismoEvaluacion.mevId) {
            this.mecanismoValido = false;
            return;
          }

          this.dmeTecnicaValido = tecnicaRegex.test(this.detalleSeleccionado.dmeTecnica);
          this.dmeInstrumentoValido = instrumentoRegex.test(this.detalleSeleccionado.dmeInstrumento);

          if (this.mecanismoValido && this.dmeTecnicaValido && this.dmeInstrumentoValido) {
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.detalleSeleccionado = new DetalleMe();
              this.isNew = true;
            }
          }else{
            Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
          }
        });
      }
    }else{
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
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

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
