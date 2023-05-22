import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalidad-curso',
  templateUrl: './modalidad-curso.component.html',
  styleUrls: ['./modalidad-curso.component.css']
})
export class ModalidadCursoComponent {
  modalidades: ModalidadCurso[] = [];
  modalidadSeleccionada: ModalidadCurso = new ModalidadCurso();
  editando: boolean = false;
  isNew: boolean = true;
  modalidadForm: FormGroup | undefined;
  submitted = false;

  constructor(private modalidadCurServ: ModalidadService) { }

  ngOnInit(): void {
    this.getModalidades();
  }

  getModalidades(): void {
    this.modalidadCurServ.getModalidadCursosTrue().subscribe((modalidades) => (this.modalidades = modalidades));
  }

  crearModalidad(): void {
    this.modalidadCurServ.post(this.modalidadSeleccionada).subscribe(() => {
      this.getModalidades();
      this.modalidadSeleccionada = new ModalidadCurso();
      Swal.fire('¡Éxito!', 'El área ha sido registrada correctamente', 'success'); // SweetAlert al crear el área
    });
  }

  editarModalidad(modalidad: ModalidadCurso): void {
    this.modalidadSeleccionada = Object.assign({}, modalidad);
    this.editando = true;
    this.isNew = false;
  }

  guardarModalidad(): void {
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalidadCurServ.update(this.modalidadSeleccionada, this.modalidadSeleccionada.mcuId).subscribe(() => {
          this.getModalidades();
          this.modalidadSeleccionada = new ModalidadCurso();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'La modalidad del Curso ha sido modificada correctamente', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modalidadSeleccionada = new ModalidadCurso();
        this.editando = false;
        this.isNew = true;
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }
  


  seleccionarModalidad(modalidad: ModalidadCurso): void {
    this.modalidadSeleccionada = Object.assign({}, modalidad);
  }

  eliminarModalidad(mcuId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalidadCurServ.delete(mcuId).subscribe(() => {
          this.getModalidades();
          Swal.fire('¡Éxito!', 'La modalidad del curso ha sido eliminada correctamente', 'success'); // SweetAlert al eliminar el área
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.modalidadForm && this.modalidadForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearModalidad();
    } else {
      this.guardarModalidad();
    }
    this.modalidadForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

   /////validaciones
   validar: claseValidaciones = new claseValidaciones();
   todosCamposVacios: boolean = true;
 
   convertirPrimeraLetraMayuscula() {
     if (this.modalidadSeleccionada.mcuNombre) {
       const nombre = this.modalidadSeleccionada.mcuNombre.trim();
       const palabras = nombre.split(' ');
       const palabrasCapitalizadas = palabras.map(palabra => {
         const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
         return primeraLetraMayuscula;
       });
       const resultado = palabrasCapitalizadas.join(' ');
       this.modalidadSeleccionada.mcuNombre = resultado;
     }
     if (
       !this.modalidadSeleccionada.mcuNombre
     ) {
       this.todosCamposVacios = true; // Todos los campos están vacíos
     } else {
       this.todosCamposVacios = false; // Al menos un campo no está vacío
     }
   }
 
   validarInputNombre() {
     if (this.modalidadSeleccionada.mcuNombre) {
       const valid = this.validar.validarLetras(this.modalidadSeleccionada.mcuNombre);
       if (valid) {
         this.modalidadSeleccionada.mcuNombre = '';
         Swal.fire({
           title: 'Advertencia',
           timer: 700,
           text: 'El nombre solo debe contener letras',
           icon: 'warning',
         });
       } else {
       }
     }
   }
 

}
