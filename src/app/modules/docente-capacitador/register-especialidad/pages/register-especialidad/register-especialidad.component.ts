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
  areaValido: boolean = true;
  espCodigoValido: boolean = true;
  espNombreValido: boolean = true;
  filtro = '';

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
    // Validación de selección de área
    if (!this.especialidadSeleccionada.area || !this.especialidadSeleccionada.area.areId) {
      this.areaValido = false;
      return;
    } else {
      this.areaValido = true;
    }

    // Validación de espCodigo
    const codigoRegex = /^[A-Z0-9.\s]+$/; // Expresión regular para letras mayúsculas, números, punto y espacios en blanco
    this.espCodigoValido = codigoRegex.test(this.especialidadSeleccionada.espCodigo);

    // Validación de espNombre
    const nombreRegex = /^[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.espNombreValido = nombreRegex.test(this.especialidadSeleccionada.espNombre);

    if (this.espCodigoValido && this.espNombreValido) {
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
          // Validación de selección de área
          if (!this.especialidadSeleccionada.area || !this.especialidadSeleccionada.area.areId) {
            this.areaValido = false;
            return;
          }

          // Validación de espCodigo
          this.espCodigoValido = codigoRegex.test(this.especialidadSeleccionada.espCodigo);

          // Validación de espNombre
          this.espNombreValido = nombreRegex.test(this.especialidadSeleccionada.espNombre);

          if (this.areaValido && this.espCodigoValido && this.espNombreValido) {
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.especialidadSeleccionada = new Especialidad();
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
          Swal.fire('¡Éxito!', 'La especialidad ha sido eliminada correctamente', 'success');
        });
      }
    });
  }

  getAreas(): void {
    this.areaServ.getAreasTrue().subscribe((areas) => (this.areas = areas));
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
