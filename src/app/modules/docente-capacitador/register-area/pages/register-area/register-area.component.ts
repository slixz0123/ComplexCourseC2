import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Area } from 'src/app/Core/models/area';
import { AreaServService } from 'src/app/shared/Services/area-serv.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor(private areaServ: AreaServService) { }

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
