import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { TipoCursoService } from 'src/app/shared/Services/tipoCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-curso',
  templateUrl: './tipo-curso.component.html',
  styleUrls: ['./tipo-curso.component.css']
})
export class TipoCursoComponent {
  tipoCurso: TiposCurso[] = [];
  tipoSeleccionado: TiposCurso = new TiposCurso();
  editando: boolean = false;
  isNew: boolean = true;
  areaForm: FormGroup | undefined;
  submitted = false;

  constructor(private tipoService: TipoCursoService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.tipoService.getAllTrue().subscribe((tipo) => (this.tipoCurso = tipo));
  }

  crearArea(): void {
    this.tipoService.post(this.tipoSeleccionado).subscribe(() => {
      this.getAreas();
      this.tipoSeleccionado = new TiposCurso();
      Swal.fire('¡Éxito!', 'El área ha sido registrada correctamente', 'success'); // SweetAlert al crear el área
    });
  }

  editarArea(area: TiposCurso): void {
    this.tipoSeleccionado = Object.assign({}, area);
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
        this.tipoService.update(this.tipoSeleccionado, this.tipoSeleccionado.tcuId).subscribe(() => {
          this.getAreas();
          this.tipoSeleccionado = new TiposCurso();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El área ha sido modificada correctamente', 'success'); // SweetAlert al editar el área
        });
      }
    });
  }


  seleccionarArea(area: TiposCurso): void {
    this.tipoSeleccionado = Object.assign({}, area);
  }

  eliminarArea(areId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoService.delete(areId).subscribe(() => {
          this.getAreas();
          Swal.fire('¡Éxito!', 'El tipo curso ha sido eliminada correctamente', 'success'); // SweetAlert al eliminar el área
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.areaForm && this.areaForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearArea();
    } else {
      this.guardarArea();
    }
    this.areaForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }


}
