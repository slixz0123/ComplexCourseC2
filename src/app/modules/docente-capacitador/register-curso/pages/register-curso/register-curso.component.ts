import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { Persona } from 'src/app/Core/models/persona';
import { ProgramaCapacitacion } from 'src/app/Core/models/ProgramaCapacitacion';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import { EspecialidadService } from 'src/app/shared/Services/especialidad.service';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';
import { TipoCursoService } from 'src/app/shared/Services/tipoCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-curso',
  templateUrl: './register-curso.component.html',
  styleUrls: ['./register-curso.component.css']
})
export class RegisterCursoComponent implements OnInit {

  programas: ProgramaCapacitacion[] = [];
  especialidades: Especialidad[] = [];
  modalidades: ModalidadCurso[] = [];
  tipos: TiposCurso[] = [];
  silabos: Datossilabo[] = [];
  necesidades: NecesidadCurso[] = [];
  disenos: DisenoCurricular[] = [];
  personas: Persona[] = [];
  persona: Persona = new Persona;
  cursoSeleccionado: Curso = new Curso();
  cursos: Curso[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  cursoForm: FormGroup | undefined;
  submitted = false;

  searchText: string = '';

  constructor(
    private cursoServ: CursoService,
    private especialidadServ: EspecialidadService,
    private modalidadCurServ: ModalidadService,
    private tipoCurServ: TipoCursoService,
    private datosSilServ: DatossilaboservService,
    private necesidadServ: NecesidadCursoService,
    private disenoCurrServ: DisenoCurricularService,
    private personaServ: PersonaService,
    private programaCapacitacionService: ProgramaCapacitacionService,
    ) { }

  ngOnInit(): void {
    this.getCursos();
    this.getProgramas();
    this.getEspecialidades();
    this.getModalidadesCur();
    this.getTiposCur();
    this.getSilabos();
    this.getnecesidadesCur();
    this.getDisenosCurr();
    this.getDocente();
  }

  getCursos(): void {
    this.cursoServ.getAllTrue().subscribe((cursos) => (this.cursos = cursos));
  }

  editarCurso(curso: Curso): void {
    this.cursoSeleccionado = Object.assign({}, curso);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado = Object.assign({}, curso);
  }

  submitForm(): void {
    if (this.isNew) { // Si se está creando un nuevo curso
      console.log('nuevo curso');
      this.cursoServ.crearCurso(this.cursoSeleccionado).subscribe(() => {
        this.getCursos();
        this.cursoSeleccionado = new Curso();
  
        Swal.fire({
          icon: 'success',
          title: 'Curso creado',
          text: 'El curso ha sido registrado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      }, (error) => {
        // Si hay un error al crear el curso, muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el curso',
          text: 'Ha ocurrido un error al intentar crear el curso. Por favor, intenta de nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      });
    } else { // Si se está editando un curso existente
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas editar este curso?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma la edición
          this.cursoServ.update(this.cursoSeleccionado, this.cursoSeleccionado.curId).subscribe(() => {
            this.getCursos();
            this.cursoSeleccionado = new Curso();
            this.isNew = true;
  
            Swal.fire({
              icon: 'success',
              title: 'Curso editado',
              text: 'El curso ha sido modificado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          }, (error) => {
            // Si hay un error al editar el curso, muestra un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error al editar el curso',
              text: 'Ha ocurrido un error al intentar editar el curso. Por favor, intenta nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          });
        }
      });
    }
  }
  


  eliminarCurso(curId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este curso?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoServ.delete(curId).subscribe(() => {
          this.getCursos();
        });
      }
    });
  }

  //Cargar datos de las relaciones de curso en las vistas
  getProgramas(): void {
    this.programaCapacitacionService.getProgramasCapacitacion().subscribe((programas) => (this.programas = programas));
  }

  /*getEspecialidades(): void {
    this.especialidadServ.getAllTrue().subscribe((especialidades) => (this.especialidades = especialidades));
  }*/

  getEspecialidades(): void {
    this.especialidadServ.getAllTrue().subscribe((data: Especialidad[]) => {
      this.especialidades = data.filter(e => e.espNombre.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  getModalidadesCur(): void {
    this.modalidadCurServ.getAll().subscribe((modalidades) => (this.modalidades = modalidades));
  }

  getTiposCur(): void {
    this.tipoCurServ.getAll().subscribe((tipos) => (this.tipos = tipos));
  }

  getSilabos(): void {
    this.datosSilServ.getAll().subscribe((silabos) => (this.silabos = silabos));
  }

  getnecesidadesCur(): void {
    this.necesidadServ.getAll().subscribe((necesidades) => (this.necesidades = necesidades));
  }

  getDisenosCurr(): void {
    this.disenoCurrServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }
  getDocente(): void {
    this.personaServ.listarPersonas().subscribe((personas) => (this.personas = personas));
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  validateInteger(event: { charCode: number; preventDefault: () => void; }) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
