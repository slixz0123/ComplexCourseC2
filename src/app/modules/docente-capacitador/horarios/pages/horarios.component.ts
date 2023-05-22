import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Horario } from 'src/app/Core/models/horario';
import { horarioService } from 'src/app/shared/Services/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{

  horarios: Horario[] = [];
  horarioSeleccionado: Horario = new Horario();
  editando: boolean = false;
  isNew: boolean = true;
  horarioForm: FormGroup | undefined;
  submitted = false;

  constructor(private horarioServ: horarioService) { }

  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios(): void {
    this.horarioServ.getHorariosTrue().subscribe((horarios) => (this.horarios = horarios));
  }

  crearHorario(): void {
    if (!this.validarFormatoHorario()) {
      Swal.fire('Error', 'El formato del horario no es válido (hh:mm)', 'error');
      return;
    }
  
    this.horarioServ.crearHorario(this.horarioSeleccionado).subscribe(() => {
      this.getHorarios();
      this.horarioSeleccionado = new Horario();
      Swal.fire('¡Éxito!', 'El horario ha sido registrado correctamente', 'success');
    });
  }

  editarHorario(horario: Horario): void {
    this.horarioSeleccionado = Object.assign({}, horario);
    this.editando = true;
    this.isNew = false;
  }

  guardarHorario(): void {
    if (!this.validarFormatoHorario()) {
      Swal.fire('Error', 'El formato del horario no es válido (hh:mm)', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioServ.updateHorario(this.horarioSeleccionado, this.horarioSeleccionado.horId).subscribe(() => {
          this.getHorarios();
          this.horarioSeleccionado = new Horario();
          this.editando = false;
          this.isNew = true;
          Swal.fire('¡Éxito!', 'El horario ha sido modificado correctamente', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.horarioSeleccionado = new Horario();
        this.editando = false;
        this.isNew = true;
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
      }
    });
  }
  
  validarFormatoHorario(): boolean {
    const formatoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return formatoHora.test(this.horarioSeleccionado.horInicio) && formatoHora.test(this.horarioSeleccionado.horFin);
  }
  


  seleccionarHorario(horario: Horario): void {
    this.horarioSeleccionado = Object.assign({}, horario);
  }

  eliminarHorario(horId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioServ.deletehorario(horId).subscribe(() => {
          this.getHorarios();
          Swal.fire('¡Éxito!', 'El horario ha sido eliminado correctamente', 'success'); // SweetAlert al eliminar el horario
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.horarioForm && this.horarioForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearHorario();
    } else {
      this.guardarHorario();
    }
    this.horarioForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  
}
