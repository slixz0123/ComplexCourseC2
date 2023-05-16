import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Area } from 'src/app/Core/models/area';
import { Especialidad } from 'src/app/Core/models/especialidad';
import 'bootstrap';
import Swal from 'sweetalert2';
import { AreaService } from 'src/app/shared/Services/area.service';
import { EspecialidadService } from 'src/app/shared/Services/especialidad.service';


@Component({
  selector: 'app-register-especialidad',
  templateUrl: './register-especialidad.component.html',
  styleUrls: ['./register-especialidad.component.css']
})
export class RegisterEspecialidadComponent {

  areas: Area[] = [];
  especialidadSeleccionada: Especialidad = new Especialidad();
  especialidades: Especialidad[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  especialidadForm: FormGroup | undefined;
  submitted = false;

  constructor(private especialidadServ: EspecialidadService, private areaServ: AreaService) { }

  ngOnInit(): void {
    this.getAreas();
    this.getEspecialidades();
  }

  getEspecialidades(): void {
    this.especialidadServ.getAllTrue().subscribe((especialidad) => (this.especialidades = especialidad));
  }

  editarEspecialidad(especialidad: Especialidad): void {
    this.especialidadSeleccionada = Object.assign({}, especialidad);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarEspecialidad(especialidad: Especialidad): void {
    this.especialidadSeleccionada = Object.assign({}, especialidad);
  }

  submitForm(): void {
    if (this.isNew) { // Si se está creando una nueva especialidad
      this.especialidadServ.create(this.especialidadSeleccionada).subscribe(() => {
        this.getEspecialidades();
        this.especialidadSeleccionada = new Especialidad();

        Swal.fire({
          icon: 'success',
          title: 'Especialidad creada',
          text: 'La especialidad ha sido registrada correctamente.',
          confirmButtonText: 'Aceptar'
        });
      });
    } else { // Si se está editando una especialidad existente
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar esta especialidad?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma la edición
          this.especialidadServ.update(this.especialidadSeleccionada, this.especialidadSeleccionada.espId).subscribe(() => {
            this.getEspecialidades();
            this.especialidadSeleccionada = new Especialidad();
            this.isNew = true;

            Swal.fire({
              icon: 'success',
              title: 'Especialidad editada',
              text: 'La especialidad ha sido modificada correctamente.',
              confirmButtonText: 'Aceptar'
            });
          });
        }
      });
    }
  }


  eliminarEspecialidad(espId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta especialidad?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadServ.delete(espId).subscribe(() => {
          this.getEspecialidades();
        });
      }
    });
  }


  getAreas(): void {
    this.areaServ.getAreasTrue().subscribe((areas) => (this.areas = areas));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

}
