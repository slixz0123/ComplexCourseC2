import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { Horario } from 'src/app/Core/models/horario';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { horarioService } from 'src/app/shared/Services/horario.service';
import { HorarioCursoService } from 'src/app/shared/Services/horarioCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios-curso',
  templateUrl: './horarios-curso.component.html',
  styleUrls: ['./horarios-curso.component.css']
})
export class HorariosCursoComponent {
  cursosList: any[] = [];
  idPersona: any;
  horarios: Horario[] = [];
  horarioCurSeleccionado: HorarioCurso = new HorarioCurso();
  horariosCur: HorarioCurso[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  horarioCurForm!: FormGroup;
  submitted = false;
  horariosCurso: any[] = [];
  showContainer1: boolean = true;
  showContainer2: boolean = false;
  selectedCursoId!: number;


  constructor(private cursoService: CursoService, private formBuilder: FormBuilder, private horarioCurServ: HorarioCursoService, private horarioServ: horarioService) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
    this.getHorarios();
  }

  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter((curso: Curso) => curso.curProceso !== 'Finalizado');
    });
  }

  selectCurso(cursoId: number): void {   
    this.horarioCurSeleccionado.hcurso.curId = cursoId; 
    this.selectedCursoId = cursoId;
    this.showContainer1 = false;
    this.showContainer2 = true;
    this.getHorariosByCurso(this.selectedCursoId);    

  }

  getHorariosByCurso(idCurso: number): void {
    this.horarioCurSeleccionado.hcurso.curId = idCurso;    
    this.horarioCurServ.getAllHorariosByCurso(idCurso).subscribe(
      horarios => {
        this.horariosCur = horarios;
        console.log(this.horariosCur); // Verificar los datos recibidoss
      },
      error => {
        console.log("Error al obtener los horarios del curso");
        console.log(error);
      }
    );
  }
  
  

  editarHorarioCur(horarioCur: HorarioCurso): void {
    this.horarioCurSeleccionado = Object.assign({}, horarioCur);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarhorarioCur(horarioCur: HorarioCurso): void {
    this.horarioCurSeleccionado = Object.assign({}, horarioCur);
  }

  submitForm(): void {
    if (this.isNew) { 
      this.horarioCurSeleccionado.hcurso.curId = this.selectedCursoId; // Asignar el ID del curso seleccionado
      this.horarioCurServ.create(this.horarioCurSeleccionado).subscribe(() => {
            this.getHorariosByCurso(this.selectedCursoId);
;
        this.horarioCurSeleccionado = new HorarioCurso();
  
        Swal.fire({
          icon: 'success',
          title: 'Horario Asignado',
          text: 'El horario ha sido asignado al curso correctamente.',
          confirmButtonText: 'Aceptar'
        });
        this.horarioCurForm.reset();

      });
    } else { 
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma la edición
          this.horarioCurServ.update(this.horarioCurSeleccionado, this.horarioCurSeleccionado.hcuId).subscribe(() => {
                this.getHorariosByCurso(this.selectedCursoId);
;
            this.horarioCurSeleccionado = new HorarioCurso();
            this.isNew = true;
  
            Swal.fire({
              icon: 'success',
              title: 'Registro editado',
              text: 'Este registro ha sido modificado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.horarioCurSeleccionado = new HorarioCurso();
          this.isNew = true;
        }
      });
    }
  }
  


  eliminarHorarioCur(espId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioCurServ.delete(espId).subscribe(() => {
              this.getHorariosByCurso(this.selectedCursoId);
;
          Swal.fire('¡Éxito!', 'Este registro ha sido eliminado correctamente', 'success');
        });
      }
    });
  }
  


  getHorarios(): void {
    this.horarioServ.getHorariosTrue().subscribe((horarios) => (this.horarios = horarios));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}
