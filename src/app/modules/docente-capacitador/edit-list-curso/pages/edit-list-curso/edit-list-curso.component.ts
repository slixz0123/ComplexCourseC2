import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import { EspecialidadService } from 'src/app/shared/Services/especialidad.service';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';
import { TipoCursoService } from 'src/app/shared/Services/tipoCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-list-curso',
  templateUrl: './edit-list-curso.component.html',
  styleUrls: ['./edit-list-curso.component.css']
})
export class EditListCursoComponent {

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  cursos: Curso[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  cursoForm!: FormGroup
  submitted = false;
  cursoSeleccionado: Curso = new Curso();

  Programanew!: ProgramaCapacitacion;
  arrayprogrma: ProgramaCapacitacion[] = [];
  newprogrmas: ProgramaCapacitacion = new ProgramaCapacitacion;
  selectedIdprogrmamacap: ProgramaCapacitacion = new ProgramaCapacitacion();

  programas!: any[]; // Variable para almacenar los programas
  especialidades!: any[]; // Variable para almacenar las especialidades
  modalidades!: any[]; // Variable para almacenar las modalidades
  tiposCurso!: any[]; // Variable para almacenar los tipos de curso
  silabos!: any[]; // Variable para almacenar los silabos
  necesidades!: any[]; // Variable para almacenar las necesidades
  disenosCurriculares!: any[]; // Variable para almacenar los diseños curriculares
  personas!: any[]; // Variable para almacenar las personas
  editImagePreview: any;
  selectedFoto?: Curso;

  programaValido: boolean = true;
  especialidadValido: boolean = true;
  modalidadValido: boolean = true;
  tipoValido: boolean = true;
  silaboValido: boolean = true;
  necesidadValido: boolean = true;
  disenoValido: boolean = true;
  curCodigoValido: boolean = true;
  curNombreValido: boolean = true;
  curFechaIValido: boolean = true;
  curFechaFValido: boolean = true;
  curNumHorasValido: boolean = true;
  curFotoValido: boolean = true;

  cursoSelec = {
    curCodigo: '',
    curNombre: '',
    curFechainicio: '',
    curFechafin: '',
    curNumHoras: '',
    curProceso: '',
    curFoto: '',
    programa: '',
    especialidad: '',
    modalidad: '',
    tipoCurso: '',
    silabo: '',
    necesidad: '',
    disenoCurricular: '',
    persona: ''
  };

  searchText: string = '';

  constructor(
    private cursoServ: CursoService,
    private especialidadServ: EspecialidadService,
    private modalidadCurServ: ModalidadService,
    private tipoCurServ: TipoCursoService,
    private datosSilServ: DatossilaboservService,
    private necesidadServ: NecesidadCursoService,
    private disenoCurrServ: DisenoCurricularService,
    private programaCapacitacionService: ProgramaCapacitacionService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCursos();
    this.getProgramas();
    this.getespecialidades();
    this.getmodalidad();
    this.gettipocurso();
    this.getdatossilab();
    this.getnecesidades();
    this.getdisenocurricular();

    this.cursoForm = this.formbuilder.group({
      curCodigo: ['', Validators.required],
      curNombre: ['', Validators.required],
      curFechainicio: ['', Validators.required],
      curFechafin: ['', Validators.required],
      curNumHoras: ['', Validators.required],
      curProceso: ['', Validators.required],
      curFoto: ['', Validators.required],
      programa: ['', Validators.required],
      especialidad: ['', Validators.required],
      modalidad: ['', Validators.required],
      tipoCurso: ['', Validators.required],
      silabo: ['', Validators.required],
      necesidad: ['', Validators.required],
      disenoCurricular: ['', Validators.required],
      persona: ['', Validators.required]
    });

    this.cargarDatos();
  }

  cargarDatos() {
    this.cursoForm.patchValue({
      curCodigo: this.cursoSeleccionado.curCodigo,
      curNombre: this.cursoSeleccionado.curNombre,
      curFechainicio: this.cursoSeleccionado.curFechainicio,
      curFechafin: this.cursoSeleccionado.curFechafin,
      curNumHoras: this.cursoSeleccionado.curNumhoras,
      curProceso: this.cursoSeleccionado.curProceso,
      curFoto: this.cursoSeleccionado.curProceso,
      programa: this.cursoSeleccionado.programaCapacitacion.pcaNombre,
      especialidad: this.cursoSeleccionado.ecursos.espNombre,
      modalidad: this.cursoSeleccionado.mcursos.mcuNombre,
      tipoCurso: this.cursoSeleccionado.tipoCurso.tcuNombre,
      silabo: this.cursoSeleccionado.datosSilabo.dsiIdentificador,
      necesidad: this.cursoSeleccionado.necesidadCurso.ncuIdentificador,
      disenoCurricular: this.cursoSeleccionado.disenoCurricular.dcuIdentificador,
      persona: this.cursoSeleccionado.pcursos.nombre
    });

    this.programaCapacitacionService.getProgramasCapacitacion().subscribe((programas) => {
      this.programas = programas;
      this.cursoForm.patchValue({
        programa: this.cursoSeleccionado.programaCapacitacion.pcaNombre
      });
    });

    this.especialidadServ.getAllTrue().subscribe((especialidades) => {
      this.especialidades = especialidades;
      this.cursoForm.patchValue({
        especialidad: this.cursoSeleccionado.ecursos.espNombre
      });
    });

    this.modalidadCurServ.getAll().subscribe((modalidades) => {
      this.modalidades = modalidades;
      this.cursoForm.patchValue({
        modalidad: this.cursoSeleccionado.mcursos.mcuNombre
      });
    });

    this.tipoCurServ.getAll().subscribe((tiposCurso) => {
      this.tiposCurso = tiposCurso;
      this.cursoForm.patchValue({
        tipoCurso: this.cursoSeleccionado.tipoCurso.tcuNombre
      });
    });

    this.datosSilServ.getAll().subscribe((silabos) => {
      this.silabos = silabos;
      this.cursoForm.patchValue({
        silabo: this.cursoSeleccionado.datosSilabo.dsiIdentificador
      });
    });

    this.necesidadServ.getAll().subscribe((necesidades) => {
      this.necesidades = necesidades;
      this.cursoForm.patchValue({
        necesidad: this.cursoSeleccionado.necesidadCurso.ncuIdentificador
      });
    });

    this.disenoCurrServ.getAll().subscribe((disenos) => {
      this.disenosCurriculares = disenos;
      this.cursoForm.patchValue({
        disenoCurricular: this.cursoSeleccionado.disenoCurricular.dcuIdentificador
      });
    });
  }


  getCursos(): void {
    const idPersona = localStorage.getItem('id_persona');

    if (idPersona) {
      this.cursoServ.cursosporDocente(idPersona).subscribe(
        cursos => {
          // Lógica para manejar los cursos obtenidos
          this.cursos = cursos;
          const nuevoCurso = new Curso();
          nuevoCurso.actualizarProceso();
        },
        error => {
          // Lógica para manejar el error
        }
      );
    }
  }

  onSelectChangeprogramcap(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }

    const selectedValue = selectElement.value;
    this.selectedIdprogrmamacap.pcaId = Number(selectedValue);
  }
  getProgramas() {
    this.programaCapacitacionService.getProgramasCapacitacion().subscribe(
      cursoscap => this.arrayprogrma = cursoscap.filter(cursoscap => cursoscap.pcaEstado !== false)

    );
  }

  // especialidades 
  Especialidadnew!: Especialidad;
  arrayespecialidad: Especialidad[] = [];
  newespecialidad: Especialidad = new Especialidad;
  selectedIdespecialidad: Especialidad = new Especialidad();

  onSelectChangeespecialidad(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdespecialidad.espId = Number(selectedValue);
  }
  getespecialidades() {
    this.especialidadServ.getAllTrue().subscribe(
      cursosespe => this.arrayespecialidad = cursosespe.filter(cursosespe => cursosespe.espEstado !== false)

    );
  }

  // modalidad 
  modalidadnew!: ModalidadCurso;
  arraymodalidad: ModalidadCurso[] = [];
  newModalidadCurso: ModalidadCurso = new ModalidadCurso;
  selectedIdModalidadCurso: ModalidadCurso = new ModalidadCurso();

  onSelectChangemodalidad(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdModalidadCurso.mcuId = Number(selectedValue);
  }
  getmodalidad() {
    this.modalidadCurServ.getAll().subscribe(
      cursosmoda => this.arraymodalidad = cursosmoda.filter(cursosmoda => cursosmoda.mcuEstado !== false)

    );
  }

  // cursocapacitacion 
  tipocursonew!: TiposCurso;
  arraytipocirsp: TiposCurso[] = [];
  newTiposCurso: TiposCurso = new TiposCurso;
  selectedIdTiposCurso: TiposCurso = new TiposCurso();

  onSelectChangetipocurso(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdTiposCurso.tcuId = Number(selectedValue);
  }
  gettipocurso() {
    this.tipoCurServ.getAll().subscribe(
      cursotipocur => this.arraytipocirsp = cursotipocur.filter(cursotipocur => cursotipocur.tcuEstado !== false)

    );
  }

  // datos silabo 
  datosilabsonew!: Datossilabo;
  arraydatosilab: Datossilabo[] = [];
  newDatossilabo: Datossilabo = new Datossilabo;
  selectedIdDatossilabo: Datossilabo = new Datossilabo();

  onSelectChangedatossilab(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdDatossilabo.dsiId = Number(selectedValue);
  }
  getdatossilab() {
    this.datosSilServ.getAll().subscribe(
      cursodtsilab => this.arraydatosilab = cursodtsilab.filter(cursodtsilab => cursodtsilab.dsiEstado !== false)

    );
  }
  // necesidaddes 
  necesidadesnew!: NecesidadCurso;
  arraynecesidades: NecesidadCurso[] = [];
  newNecesidadCurso: NecesidadCurso = new NecesidadCurso;
  selectedIdNecesidadCurso: NecesidadCurso = new NecesidadCurso();

  onSelectChangenecesidades(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdNecesidadCurso.ncuId = Number(selectedValue);
  }
  getnecesidades() {
    this.necesidadServ.getAll().subscribe(
      cursonecesidades => this.arraynecesidades = cursonecesidades.filter(cursonecesidades => cursonecesidades.ncuEstado !== false)

    );
  }

  // diseño curricular 
  disenonew!: DisenoCurricular;
  arraydseno: DisenoCurricular[] = [];
  newDisenoCurricular: DisenoCurricular = new DisenoCurricular;
  selectedIdDisenoCurricular: DisenoCurricular = new DisenoCurricular();

  onSelectChangediseno(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdDisenoCurricular.dcuId = Number(selectedValue);
  }
  getdisenocurricular() {
    this.disenoCurrServ.getAllTrue().subscribe(
      cursodiseno => this.arraydseno = cursodiseno.filter(cursodiseno => cursodiseno.dcuEstado !== false)

    );
  }


  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  mostrarCursoEnEdicion(curso: any) {
    this.selectedFoto = curso;
    const fechai = new Date(curso.curFechainicio);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    const fechaf = new Date(curso.curFechafin);
    const fechaFormateadaf = fechaf.toISOString().slice(0, 10); // "2023-05-10"
    this.cursoForm.patchValue({
      curCodigo: curso.curCodigo,
      curNombre: curso.curNombre,
      curFechainicio: fechaFormateadai,
      curFechafin: fechaFormateadaf,
      curNumHoras: curso.curNumhoras,
      curProceso: curso.curProceso,
      curFoto: curso.curFoto,
      programa: curso.programaCapacitacion.pcaNombre,
      especialidad: curso.ecursos.espNombre,
      modalidad: curso.mcursos.mcuNombre,
      tipoCurso: curso.tipoCurso.tcuNombre,
      silabo: curso.datosSilabo.dsiIdentificador,
      necesidad: curso.necesidadCurso.ncuIdentificador,
      disenoCurricular: curso.disenoCurricular.dcuIdentificador,
      persona: curso.pcursos.nombre
    });

    this.cursoSeleccionado = curso;
    this.showContainer1 = false;
    this.showContainer2 = true;
  }

  actualizarCurso(): void {
    // Obtener las fechas del formulario
    const fechaInicio = new Date(this.cursoSeleccionado.curFechainicio);
    const fechaFin = new Date(this.cursoSeleccionado.curFechafin);

    // Convertir las fechas a formato UTC
    const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
    const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate());

    // Asignar las fechas UTC al objeto cursoSeleccionado
    this.cursoSeleccionado.curFechainicio = fechaInicioUTC;
    this.cursoSeleccionado.curFechafin = fechaFinUTC;
    const codigoRegex = /^[a-zA-Z0-9.]+$/;
    this.curCodigoValido = codigoRegex.test(this.cursoSeleccionado.curCodigo.toString());

    const nombreRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.curNombreValido = nombreRegex.test(this.cursoSeleccionado.curNombre);

    // Verificar que la fecha de inicio no sea menor o igual a la fecha actual del sistema
    this.curFechaIValido = new Date(this.cursoSeleccionado.curFechainicio) > new Date();

    // Verificar que la fecha de fin sea mayor a la fecha de inicio
    this.curFechaFValido = new Date(this.cursoSeleccionado.curFechafin) > new Date(this.cursoSeleccionado.curFechainicio);

    // Verificar que el número de horas sea un entero mayor a 0
    const numHoras = parseInt(this.cursoSeleccionado.curNumhoras.toString(), 10);
    this.curNumHorasValido = Number.isInteger(numHoras) && numHoras > 0;

    if (!this.cursoSeleccionado.programaCapacitacion || !this.cursoSeleccionado.programaCapacitacion.pcaId) {
      this.programaValido = false;
      return;
    }
    if (!this.cursoSeleccionado.ecursos || !this.cursoSeleccionado.ecursos.espId) {
      this.especialidadValido = false;
      return;
    }
    if (!this.cursoSeleccionado.mcursos || !this.cursoSeleccionado.mcursos.mcuId) {
      this.modalidadValido = false;
      return;
    }
    if (!this.cursoSeleccionado.tipoCurso || !this.cursoSeleccionado.tipoCurso.tcuId) {
      this.tipoValido = false;
      return;
    }
    if (!this.cursoSeleccionado.datosSilabo || !this.cursoSeleccionado.datosSilabo.dsiId) {
      this.silaboValido = false;
      return;
    }
    if (!this.cursoSeleccionado.necesidadCurso || !this.cursoSeleccionado.necesidadCurso.ncuId) {
      this.necesidadValido = false;
      return;
    }
    if (!this.cursoSeleccionado.disenoCurricular || !this.cursoSeleccionado.disenoCurricular.dcuId) {
      this.disenoValido = false;
      return;
    }
    if (this.curCodigoValido && this.curNombreValido && this.curFechaIValido && this.curFechaFValido && this.curNumHorasValido &&
      this.programaValido && this.especialidadValido && this.modalidadValido && this.tipoValido && this.silaboValido && this.necesidadServ && this.disenoValido) {

      Swal.fire({
        title: 'Confirmar edición',
        text: '¿Estás seguro de que deseas editar este curso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cursoServ.update(this.cursoSeleccionado, this.cursoSeleccionado.curId).subscribe(
            response => {
              this.getCursos();
              this.cursoSeleccionado = new Curso();

              Swal.fire({
                title: 'Curso actualizado',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              });
              this.getCursos();
              this.showContainer1 = true;
              this.showContainer2 = false;
              this.cursoForm.get('curFoto')?.reset();
            },
            error => {
              Swal.fire({
                title: 'Error al actualizar el curso',
                text: 'Ha ocurrido un error al actualizar el curso. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
              });
            }
          );
          this.showContainer1 = true;
          this.showContainer2 = false;
        }
      });
      this.getCursos();
    }else{
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
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
          Swal.fire('Curso eliminado', 'El curso ha sido eliminado correctamente', 'success');
        });
      }
    });
  }

  onEditFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.cursoForm.patchValue({
          photoModal: imgBase64.split(',')[1],
        });
        this.editImagePreview = imgBase64;
      };
    } else {
      // Si no hay un archivo seleccionado, establecemos `photoModal` y `editImagePreview` a `null`.
      this.cursoForm.patchValue({
        photoModal: null,
      });
      this.editImagePreview = null;
    }
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.cursoForm.patchValue({
        photoModal: null,
      });
      this.editImagePreview = null;
    };
  }

}