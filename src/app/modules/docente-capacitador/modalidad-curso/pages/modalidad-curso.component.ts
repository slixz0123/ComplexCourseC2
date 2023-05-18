import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalidad-curso',
  templateUrl: './modalidad-curso.component.html',
  styleUrls: ['./modalidad-curso.component.css']
})
export class ModalidadCursoComponent {
  modos: ModalidadCurso[] = [];
  modoSeleccionado: ModalidadCurso = new ModalidadCurso();
  editando: boolean = false;
  isNew: boolean = true;
  modoForm: FormGroup | undefined;
  submitted = false;

  constructor(private areaServ: ModalidadService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaServ.getAllTrue().subscribe((modos) => (this.modos = modos));
  }

  crearArea(): void {
    this.areaServ.post(this.modoSeleccionado).subscribe(() => {
      this.getAreas();
      this.modoSeleccionado = new ModalidadCurso();
      Swal.fire('¡Éxito!', 'El área ha sido registrada correctamente', 'success'); // SweetAlert al crear el área
    });
  }

  editarArea(area: ModalidadCurso): void {
    this.modoSeleccionado = Object.assign({}, area);
    this.editando = true;
    this.isNew = false;
  }

  guardarArea(): void {
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaServ.update(this.modoSeleccionado, this.modoSeleccionado.mcuId).subscribe(() => {
          this.getAreas();
          this.modoSeleccionado = new ModalidadCurso();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El área ha sido modificada correctamente', 'success'); // SweetAlert al editar el área
        });
      }
    });
  }


  seleccionarArea(area: ModalidadCurso): void {
    this.modoSeleccionado = Object.assign({}, area);
  }

  eliminarArea(areId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaServ.delete(this.modoSeleccionado, areId).subscribe(() => {
          this.getAreas();
          Swal.fire('¡Éxito!', 'El área ha sido eliminada correctamente', 'success'); // SweetAlert al eliminar el área
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.modoForm && this.modoForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearArea();
    } else {
      this.guardarArea();
    }
    this.modoForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
