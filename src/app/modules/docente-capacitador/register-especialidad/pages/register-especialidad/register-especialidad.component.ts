import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Area } from 'src/app/Core/models/area';
import { Especialidad } from 'src/app/Core/models/especialidad';
import { EspecialidadServService } from 'src/app/shared/Services/especialidad-serv.service';
import 'bootstrap';
import { AreaServService } from 'src/app/shared/Services/area-serv.service';


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
  selectedArea!: Area;

  constructor(private especialidadServ: EspecialidadServService, private areaServ: AreaServService) {}

  ngOnInit(): void {
    this.getAreas();
    this.getEspecialidades();
  }

  getEspecialidades(): void {
    this.especialidadServ.getAllTrue().subscribe((especialidad) => (this.especialidades = especialidad));
  }

  crearEspeciaidad(): void {
    const data = {
      espCodigo: this.especialidadSeleccionada.espCodigo,
      espNombre: this.especialidadSeleccionada.espNombre,
      area: this.especialidadSeleccionada.area
    };
  
    this.especialidadServ.create(data).subscribe(() => {
      this.getEspecialidades();
      this.especialidadSeleccionada = new Especialidad();
      console.log(this.especialidadSeleccionada);
    });
  }

  guardarEspecialidad(): void {
    this.especialidadServ.update(this.especialidadSeleccionada, this.especialidadSeleccionada.espId).subscribe(() => {
      this.getEspecialidades();
      this.especialidadSeleccionada = new Especialidad();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
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
    if (this.isNew) {
    this.especialidadServ.create(this.especialidadSeleccionada).subscribe(() => {
    this.getEspecialidades();
    this.especialidadSeleccionada = new Especialidad();
    });
    } else {
    this.especialidadServ.update(this.especialidadSeleccionada, this.especialidadSeleccionada.espId).subscribe(() => {
    this.getEspecialidades();
    this.especialidadSeleccionada = new Especialidad();
    this.isNew = true;
    });
    }
    }

    eliminarEspecialidad(espId: number): void {
      if (confirm('¿Está seguro que desea eliminar esta especialidad?')) {
        this.especialidadServ.delete(espId).subscribe(() => {
          this.getEspecialidades();
        });
      }
    }

  getAreas(): void {
    this.areaServ.getAreasTrue().subscribe((areas) => (this.areas = areas));
  }

  filtro = '';

actualizarFiltro() {
  this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
}

mostrarDatosSeleccionados() {
  const especialidadSeleccionada = this.areas.find(area => area.areId === this.especialidadSeleccionada.area.areId);
  console.log(especialidadSeleccionada);
}

}
