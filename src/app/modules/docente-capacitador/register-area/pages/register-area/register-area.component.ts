import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Area } from 'src/app/Core/models/area';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaService } from 'src/app/shared/Services/area.service';

@Component({
  selector: 'app-register-area',
  templateUrl: './register-area.component.html',
  styleUrls: ['./register-area.component.css']
})
export class RegisterAreaComponent implements OnInit {

  areas: Area[] = [];
  areaSeleccionada: Area = new Area();
  editando: boolean = false;
  isNew: boolean = true;
  areaForm: FormGroup | undefined;
  submitted = false;
  areCodigoValido: boolean = true;
  areNombreValido: boolean = true;
  filtro = '';

  constructor(private areaServ: AreaService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaServ.getAreasTrue().subscribe((areas) => (this.areas = areas));
  }

  crearArea(): void {
    this.areaServ.saveArea(this.areaSeleccionada).subscribe(() => {
      this.getAreas();
      this.areaSeleccionada = new Area();
      Swal.fire('¡Éxito!', 'El área ha sido registrada correctamente', 'success'); // SweetAlert al crear el área
    });
  }

  editarArea(area: Area): void {
    this.areaSeleccionada = Object.assign({}, area);
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
        this.areaServ.updateArea(this.areaSeleccionada, this.areaSeleccionada.areId).subscribe(() => {
          this.getAreas();
          this.areaSeleccionada = new Area();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El área ha sido modificada correctamente', 'success'); // SweetAlert al editar el área
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.areaSeleccionada = new Area();
        this.editando = false;
        this.isNew = true;
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }

  seleccionarArea(area: Area): void {
    this.areaSeleccionada = Object.assign({}, area);
  }

  eliminarArea(areId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaServ.deleteArea(areId).subscribe(() => {
          this.getAreas();
          Swal.fire('¡Éxito!', 'El área ha sido eliminada correctamente', 'success'); // SweetAlert al eliminar el área
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.areaForm && this.areaForm.invalid) {
      return;
    }

    // Validación de areCodigo
    const codigoRegex = /^[A-Z\s]+$/; // Expresión regular para letras mayúsculas
    this.areCodigoValido = codigoRegex.test(this.areaSeleccionada.areCodigo);

    // Validación de areNombre
    const nombreRegex = /^[A-Z\s.ÁÉÍÓÚÜÑ]+$/i; // Expresión regular para letras
    this.areNombreValido = nombreRegex.test(this.areaSeleccionada.areNombre);

    if (this.areCodigoValido && this.areNombreValido) {
      if (this.isNew) {
        this.crearArea();
      } else {
        this.guardarArea();
      }
      this.areaForm?.reset();
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
