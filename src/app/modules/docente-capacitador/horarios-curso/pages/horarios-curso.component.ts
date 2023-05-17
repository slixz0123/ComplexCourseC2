import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Horario } from 'src/app/Core/models/horario';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { horarioService } from 'src/app/shared/Services/horario.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios-curso',
  templateUrl: './horarios-curso.component.html',
  styleUrls: ['./horarios-curso.component.css']
})
export class HorariosCursoComponent {
  horarios: Horario[] = [];
  horarioSeleccionado: HorarioCurso = new HorarioCurso();
  horarioCu: HorarioCurso[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  horarioCursoForm: FormGroup | undefined;
  submitted = false;

  constructor(private horarioCurService: HorarioCursoService, private horarioserv: horarioService) { }

  ngOnInit(): void {
    this.getAreas();
    this.gethorarioCu();
  }

  gethorarioCu(): void {
    this.horarioCurService.getAllTrue().subscribe((especialidad) => (this.horarioCu = especialidad));
  }

  editarEspecialidad(especialidad: HorarioCurso): void {
    this.horarioSeleccionado = Object.assign({}, especialidad);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarEspecialidad(especialidad: HorarioCurso): void {
    this.horarioSeleccionado = Object.assign({}, especialidad);
  }


  submitForm(): void {
    if (this.isNew) { // Si se está creando una nueva especialidad
      this.horarioCurService.saveHorarioCurso(this.horarioSeleccionado).subscribe(() => {
        this.gethorarioCu();
        this.horarioSeleccionado = new HorarioCurso();

        Swal.fire({
          icon: 'success',
          title: 'HorarioCurso creada',
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
          this.horarioCurService.updateHorarioCurso(this.horarioSeleccionado.hcurso, this.horarioSeleccionado).subscribe(() => {
            this.gethorarioCu();
            this.horarioSeleccionado = new HorarioCurso();
            this.isNew = true;

            Swal.fire({
              icon: 'success',
              title: 'HorarioCurso editada',
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
      title: '¿Está seguro que desea eliminar este horario curso?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioCurService.delete(espId).subscribe(() => {
          this.gethorarioCu();
        });
      }
    });
  }


  getAreas(): void {
    this.horarioserv.listarHorarios().subscribe((horario) => (this.horarios = horario));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
