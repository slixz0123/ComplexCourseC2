import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Core/models/curso';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import { EspecialidadService } from 'src/app/shared/Services/especialidad.service';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';
import { TipoCursoService } from 'src/app/shared/Services/tipoCurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-curso',
  templateUrl: './register-curso.component.html',
  styleUrls: ['./register-curso.component.css']
})
export class RegisterCursoComponent implements OnInit {

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
  imagePreview: any;
  editImagePreview: any;

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
  filtro = '';
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
    private formbuilder: FormBuilder,
    private router: Router
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

    this.formbuilder.group({

      curNombre: ['', Validators.required],
      curFechainicio: ['', Validators.required],
      curFechafin: ['', Validators.required],
      curNumHoras: ['', Validators.required],
      curProceso: ['', Validators.required],
      curFoto: ['', Validators.required],
      pcaId: ['', Validators.required],
      espId: ['', Validators.required],
      mcuId: ['', Validators.required],
      tcuId: ['', Validators.required],
      dsiId: ['', Validators.required],
      dcuId: ['', Validators.required],
      id_persona: ['', Validators.required],

    });
    this.cursoForm = new FormGroup({

      curCodigo: new FormControl(),

      curNombre: new FormControl(),
      curFechainicio: new FormControl(),
      curFechafin: new FormControl(),
      curNumHoras: new FormControl(),
      curProceso: new FormControl(),
      curFoto: new FormControl(),
      pcaId: new FormControl(),
      espId: new FormControl(),
      mcuId: new FormControl(),
      tcuId: new FormControl(),
      dsiId: new FormControl(),
      dcuId: new FormControl(),
      id_persona: new FormControl(),



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

  generarcodigoFoto() {
    const base64String = this.cursoForm.value.curFoto;

    if (base64String) {
      const cleanedBase64String = base64String.replace("data:image/jpeg;base64,", "");
      this.cursoSeleccionado.curFoto = cleanedBase64String;
    } else {
      this.cursoSeleccionado.curFoto = ""; // Asignar un valor vacío si no se proporciona imagen
    }
  }

  crearcurso() {
    this.generarcodigoFoto();
    this.cursoSeleccionado.curProceso = "Próximamente";
    const fechaInicio = new Date(this.cursoSeleccionado.curFechainicio);
    const fechaFin = new Date(this.cursoSeleccionado.curFechafin);

    const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
    const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate());

    this.cursoSeleccionado.curFechainicio = fechaInicioUTC;
    this.cursoSeleccionado.curFechafin = fechaFinUTC;

    this.cursoSeleccionado.programaCapacitacion = this.selectedIdprogrmamacap;
    this.programaCapacitacionService.getProgramaCapacitacionById(this.cursoSeleccionado.programaCapacitacion.pcaId).subscribe(programcapata => {
      this.cursoSeleccionado.programaCapacitacion = programcapata;

      this.cursoSeleccionado.ecursos = this.selectedIdespecialidad;
      this.especialidadServ.getById(this.cursoSeleccionado.ecursos.espId).subscribe(programespe => {
        this.cursoSeleccionado.ecursos = programespe;

        this.cursoSeleccionado.mcursos = this.selectedIdModalidadCurso;
        this.modalidadCurServ.getById(this.cursoSeleccionado.mcursos.mcuId).subscribe(datamodalidad => {
          this.cursoSeleccionado.mcursos = datamodalidad;

          this.cursoSeleccionado.tipoCurso = this.selectedIdTiposCurso;
          this.tipoCurServ.getById(this.cursoSeleccionado.tipoCurso.tcuId).subscribe(datatipocur => {
            this.cursoSeleccionado.tipoCurso = datatipocur;

            this.cursoSeleccionado.datosSilabo = this.selectedIdDatossilabo;
            this.datosSilServ.getById(this.cursoSeleccionado.datosSilabo.dsiId).subscribe(datatsilabo => {
              this.cursoSeleccionado.datosSilabo = datatsilabo;

              this.cursoSeleccionado.necesidadCurso = this.selectedIdNecesidadCurso;
              this.necesidadServ.getById(this.cursoSeleccionado.necesidadCurso.ncuId).subscribe(datanece => {
                this.cursoSeleccionado.necesidadCurso = datanece;

                this.cursoSeleccionado.disenoCurricular = this.selectedIdDisenoCurricular;
                this.disenoCurrServ.getById(this.cursoSeleccionado.disenoCurricular.dcuId).subscribe(datadiseno => {
                  this.cursoSeleccionado.disenoCurricular = datadiseno;

                  const idPersona = localStorage.getItem('id_persona');
                  if (idPersona) {
                    const selectedId = Number(idPersona);
                    this.cursoSeleccionado.pcursos.id_persona = selectedId;

                    this.cursoSeleccionado.curEstado = true;
                    const codigoRegex = /^[a-zA-Z0-9.\s]+$/;
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
                    } else {
                      this.programaValido = true;
                    }
                    if (!this.cursoSeleccionado.ecursos || !this.cursoSeleccionado.ecursos.espId) {
                      this.especialidadValido = false;
                      return;
                    } else {
                      this.especialidadValido = true;
                    }
                    if (!this.cursoSeleccionado.mcursos || !this.cursoSeleccionado.mcursos.mcuId) {
                      this.modalidadValido = false;
                      return;
                    } else {
                      this.modalidadValido = true;
                    }
                    if (!this.cursoSeleccionado.tipoCurso || !this.cursoSeleccionado.tipoCurso.tcuId) {
                      this.tipoValido = false;
                      return;
                    } else {
                      this.tipoValido = true;
                    }
                    if (!this.cursoSeleccionado.datosSilabo || !this.cursoSeleccionado.datosSilabo.dsiId) {
                      this.silaboValido = false;
                      return;
                    } else {
                      this.silaboValido = true;
                    }
                    if (!this.cursoSeleccionado.necesidadCurso || !this.cursoSeleccionado.necesidadCurso.ncuId) {
                      this.necesidadValido = false;
                      return;
                    } else {
                      this.necesidadValido = true;
                    }
                    if (!this.cursoSeleccionado.disenoCurricular || !this.cursoSeleccionado.disenoCurricular.dcuId) {
                      this.disenoValido = false;
                      return;
                    } else {
                      this.disenoValido = true;
                    }
                    if (this.curCodigoValido && this.curNombreValido && this.curFechaIValido && this.curFechaFValido && this.curNumHorasValido) {
                      this.cursoServ.crearCurso(this.cursoSeleccionado).subscribe(datacursocreado => {
                        Swal.fire('¡Éxito!', 'El curso ha sido creado correctamente', 'success').then(() => {
                          this.cursoForm.reset();
                          this.getCursos();
                          this.cursoForm.get('curFoto')?.reset();
                          this.cursoForm.get('pcaId')?.setValue("Seleccione una opción");
                          this.cursoForm.get('espId')?.setValue("Seleccione una opción");
                          this.cursoForm.get('mcuId')?.setValue("Seleccione una opción");
                          this.cursoForm.get('tcuId')?.setValue("Seleccione una opción");
                          this.cursoForm.get('dsiId')?.setValue("Seleccione una opción");
                          this.cursoForm.get('dcuId')?.setValue("Seleccione una opción");
                          this.getCursos();
                          this.goToeditprofile(event);

                        });
                      });
                    }else{
                      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
                    }
                  }
                });
              });
            });
          });
        });
      });
    });
  }

  goToeditprofile($event: any): void {
    this.router.navigate(['Capacitador/edit-list-curso'])
    this.getCursos();
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  getImageSrc(base64: string): string {
    return 'data:image/jpeg;base64,' + base64;
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

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.cursoForm.patchValue({
          curFoto: imgBase64.split(',')[1],
        });
        this.imagePreview = imgBase64;
      };
    }
  }
}  