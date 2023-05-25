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
  
  tipos: TiposCurso[] = [];
  tipoCSeleccionado: TiposCurso = new TiposCurso();
  editando: boolean = false;
  isNew: boolean = true;
  tipoCForm: FormGroup | undefined;
  submitted = false;
  tcuNombreValido: Boolean = true;
  filtro = '';

  constructor(private tipoCurServ: TipoCursoService) { }

  ngOnInit(): void {
    this.getTiposCursos();
  }

  getTiposCursos(): void {
    this.tipoCurServ.getTiposCursosTrue().subscribe((tipos) => (this.tipos = tipos));
  }

  crearTiposCurso(): void {
    this.tipoCurServ.post(this.tipoCSeleccionado).subscribe(() => {
      this.getTiposCursos();
      this.tipoCSeleccionado = new TiposCurso();
      Swal.fire('¡Éxito!', 'El tipo de curso ha sido registrado correctamente', 'success');
    });
  }

  editarTiposCurso(tipo: TiposCurso): void {
    this.tipoCSeleccionado = Object.assign({}, tipo);
    this.editando = true;
    this.isNew = false;
  }

  guardarTiposCurso(): void {
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoCurServ.update(this.tipoCSeleccionado, this.tipoCSeleccionado.tcuId).subscribe(() => {
          this.getTiposCursos();
          this.tipoCSeleccionado = new TiposCurso();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El tipo de curso ha sido modificado correctamente', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.tipoCSeleccionado = new TiposCurso();
        this.editando = false;
        this.isNew = true;
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }

  seleccionarTiposCurso(tipo: TiposCurso): void {
    this.tipoCSeleccionado = Object.assign({}, tipo);
  }

  eliminarTiposCurso(tcuId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoCurServ.delete(tcuId).subscribe(() => {
          this.getTiposCursos();
          Swal.fire('¡Éxito!', 'El tipo de curso ha sido eliminado correctamente', 'success');
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.tipoCForm && this.tipoCForm.invalid) {
      return;
    }
    const nombreRegex = /^[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.tcuNombreValido = nombreRegex.test(this.tipoCSeleccionado.tcuNombre);
    if (this.tcuNombreValido) {
      if (this.isNew) {
        this.crearTiposCurso();
      } else {
        this.guardarTiposCurso();
      }
      this.tipoCForm?.reset();
      this.submitted = false;
      this.isNew = true;
    }else{
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
