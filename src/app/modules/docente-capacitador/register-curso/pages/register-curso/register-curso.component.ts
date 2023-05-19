import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { Especialidad } from 'src/app/Core/models/especialidad';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { Persona } from 'src/app/Core/models/persona';
import { ProgramaCapacitacion } from 'src/app/Core/models/programaCapacitacion';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { CursosAplicadosComponent } from 'src/app/modules/participantes/cursos-aplicados/pages/cursos-aplicados/cursos-aplicados.component';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import { EspecialidadService } from 'src/app/shared/Services/especialidad.service';
import { FotoService } from 'src/app/shared/Services/foto.service';
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
  nombre_orignal: string = "";
  cap_nombre_archivo: any;
  selectedFile!: File;
  image!: any;
  file: any = '';

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
    private formbuilder: FormBuilder,
    private fotoService: FotoService
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

  

  crearcurso() {
    const fechaInicio = new Date(this.cursoSeleccionado.curFechainicio);
  const fechaFin = new Date(this.cursoSeleccionado.curFechafin);

  const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
  const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate());

  this.cursoSeleccionado.curFechainicio = fechaInicioUTC;
  this.cursoSeleccionado.curFechafin = fechaFinUTC;

  const formulario = this.cursoForm.value;

  this.cursoSeleccionado.curFoto = this.nombre_orignal;
    this.cargarImagen();
  
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
                    this.cursoServ.crearCurso(this.cursoSeleccionado).subscribe(datacursocreado => {
                      Swal.fire('¡Éxito!', 'El curso ha sido creado correctamente', 'success').then(() => {
                      });
                    });
                  }
                });
              });
            });
          });
        });
      });
    });
    this.getCursos();
  }
  
  
  
  




  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  ////////////////////////////////////
  onEdit(curso: Curso): void {
    // Implementa la lógica para editar un registro fotográfico aquí
    console.log('Editar registro:', curso.curId);
  }

  getImageSrc(base64: string): string {
    return 'data:image/jpeg;base64,' + base64;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.cursoForm.patchValue({
          photo: imgBase64.split(',')[1]
        });
      };
  
      reader.onerror = (error) => {
        console.log('Error al leer el archivo:', error);
      };
    }
  }
//////////////////////////222222
  public imageSelected(event: any) {

    this.selectedFile = event.target.files[0];

    // mostrar imagen seleccionada
    this.image = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.file = reader.result;
    };


    // CAPTURAR EL NAME DE LA IMAGEN
    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
    this.nombre_orignal = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal);
    console.log(this.nombre_orignal);

  }
  cargarImagen() {
    this.fotoService.guararImagenes(this.selectedFile);
  }
}  