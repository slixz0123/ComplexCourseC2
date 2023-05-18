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
    private formbuilder:FormBuilder
    ) { }

  ngOnInit(): void {

    this.getProgramas();
    this.getespecialidades();
    this.getmodalidad();
    this.gettipocurso();
    this.getdatossilab();
    this.getnecesidades();
    this.getdisenocurricular();
    this.getpersonas();

    this.cursoForm = this.formbuilder.group({
      
      curNombre: ['', Validators.required],
      curFechainicio: ['', Validators.required],
      curFechafin: ['', Validators.required],
      curNumHoras: ['', Validators.required],
      curProceso: ['', Validators.required],
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
      pcaId: new FormControl(),
      espId:new FormControl(),
      mcuId: new FormControl(),
      tcuId: new FormControl(),
      dsiId:new FormControl(),
      dcuId:new FormControl(),
      id_persona: new FormControl(),
     


    });
    
  }

  cursoSeleccionado: Curso = new Curso();


  Programanew!: ProgramaCapacitacion;
  arrayprogrma : ProgramaCapacitacion[]=[];
  newprogrmas: ProgramaCapacitacion = new ProgramaCapacitacion; 
  selectedIdprogrmamacap: ProgramaCapacitacion = new ProgramaCapacitacion();

 

  onSelectChangeprogramcap(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; 
    }
  
    const selectedValue = selectElement.value;
    console.log(selectedValue); 
    this.selectedIdprogrmamacap.pcaId = Number(selectedValue);
  }
  getProgramas(){
    this.programaCapacitacionService.getProgramasCapacitacion().subscribe(
      cursoscap =>this.arrayprogrma = cursoscap.filter(cursoscap=>cursoscap.pcaEstado!==false)

    );}

    // especialidades 
    Especialidadnew!: Especialidad;
    arrayespecialidad : Especialidad[]=[];
    newespecialidad: Especialidad = new Especialidad; 
    selectedIdespecialidad: Especialidad = new Especialidad();

    onSelectChangeespecialidad(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdespecialidad.espId = Number(selectedValue);
    }
    getespecialidades(){
      this.especialidadServ.getespecialidadall().subscribe(
        cursosespe =>this.arrayespecialidad = cursosespe.filter(cursosespe=>cursosespe.espEstado!==false)
  
      );}

        // modalidad 
    modalidadnew!: ModalidadCurso;
    arraymodalidad : ModalidadCurso[]=[];
    newModalidadCurso: ModalidadCurso = new ModalidadCurso; 
    selectedIdModalidadCurso: ModalidadCurso = new ModalidadCurso();

    onSelectChangemodalidad(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdModalidadCurso.mcuId = Number(selectedValue);
    }
    getmodalidad(){
      this.modalidadCurServ.getAll().subscribe(
        cursosmoda =>this.arraymodalidad = cursosmoda.filter(cursosmoda=>cursosmoda.mcuEstado!==false)
  
      );}

        // cursocapacitacion 
    tipocursonew!: TiposCurso;
    arraytipocirsp : TiposCurso[]=[];
    newTiposCurso: TiposCurso = new TiposCurso; 
    selectedIdTiposCurso: TiposCurso = new TiposCurso();

    onSelectChangetipocurso(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdTiposCurso.tcuId = Number(selectedValue);
    }
    gettipocurso(){
      this.tipoCurServ.getAll().subscribe(
        cursotipocur =>this.arraytipocirsp = cursotipocur.filter(cursotipocur=>cursotipocur.tcuEstado!==false)
  
      );}

            // datos silabo 
    datosilabsonew!: Datossilabo;
    arraydatosilab : Datossilabo[]=[];
    newDatossilabo: Datossilabo = new Datossilabo; 
    selectedIdDatossilabo: Datossilabo = new Datossilabo();

    onSelectChangedatossilab(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdDatossilabo.dsiId = Number(selectedValue);
    }
    getdatossilab(){
      this.datosSilServ.getAll().subscribe(
        cursodtsilab =>this.arraydatosilab = cursodtsilab.filter(cursodtsilab=>cursodtsilab.dsiEstado!==false)
  
      );}
           // necesidaddes 
    necesidadesnew!: NecesidadCurso;
    arraynecesidades : NecesidadCurso[]=[];
    newNecesidadCurso: NecesidadCurso = new NecesidadCurso; 
    selectedIdNecesidadCurso: NecesidadCurso = new NecesidadCurso();

    onSelectChangenecesidades(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdNecesidadCurso.ncuId = Number(selectedValue);
    }
    getnecesidades(){
      this.necesidadServ.getAll().subscribe(
        cursonecesidades =>this.arraynecesidades = cursonecesidades.filter(cursonecesidades=>cursonecesidades.ncuEstado!==false)
  
      );}

             // diseño curricular 
    disenonew!: DisenoCurricular;
    arraydseno : DisenoCurricular[]=[];
    newDisenoCurricular: DisenoCurricular = new DisenoCurricular; 
    selectedIdDisenoCurricular: DisenoCurricular = new DisenoCurricular();

    onSelectChangediseno(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdDisenoCurricular.dcuId = Number(selectedValue);
    }
    getdisenocurricular(){
      this.disenoCurrServ.getAll().subscribe(
        cursodiseno =>this.arraydseno = cursodiseno.filter(cursodiseno=>cursodiseno.dcuEstado!==false)
  
      );}

               // personas 
    personanew!: Persona;
    arraypersona : Persona[]=[];
    newPersona: Persona = new Persona; 
    selectedIdPersona: Persona = new Persona();

    onSelectChangepersona(eventTarget: EventTarget | null) {
      const selectElement = eventTarget as HTMLSelectElement;
      if (!selectElement) {
        return; 
      }
      const selectedValue = selectElement.value;
      console.log(selectedValue); 
      this.selectedIdPersona.id_persona = Number(selectedValue);
    }
    getpersonas(){
      this.personaServ.listarPersonas().subscribe(
        cursopersona =>this.arraypersona = cursopersona.filter(cursopersona=>cursopersona.enabled!==false)
  
      );}

  
  


crearcurso(){
   
        
           this.cursoSeleccionado.programaCapacitacion =  this.selectedIdprogrmamacap
        
           this.programaCapacitacionService.getProgramaCapacitacionById(this.cursoSeleccionado.programaCapacitacion.pcaId).subscribe(programcapata => {
            console.log(programcapata);
          
            this.cursoSeleccionado.programaCapacitacion = programcapata
          
           
            this.cursoSeleccionado.ecursos =  this.selectedIdespecialidad
            this.especialidadServ.getById(this.cursoSeleccionado.ecursos.espId).subscribe(programespe=> {
              console.log(programespe);
            
              this.cursoSeleccionado.ecursos = programespe
             
              this.cursoSeleccionado.mcursos =  this.selectedIdModalidadCurso
              this.modalidadCurServ.getById(this.cursoSeleccionado.mcursos.mcuId).subscribe(datamodalidad=> {
                console.log(datamodalidad);
              
                this.cursoSeleccionado.mcursos = datamodalidad
            


                this.cursoSeleccionado.tipoCurso =  this.selectedIdTiposCurso
                this.tipoCurServ.getById(this.cursoSeleccionado.tipoCurso.tcuId).subscribe(datatipocur=> {
                  console.log(datatipocur);
                
                  this.cursoSeleccionado.tipoCurso = datatipocur

                  this.cursoSeleccionado.datosSilabo =  this.selectedIdDatossilabo
                  this.datosSilServ.getById(this.cursoSeleccionado.datosSilabo.dsiId).subscribe(datatsilabo=> {
                    console.log(datatsilabo);
                  
                    this.cursoSeleccionado.datosSilabo = datatsilabo
              
                    this.cursoSeleccionado.necesidadCurso =  this.selectedIdNecesidadCurso
                    this.necesidadServ.getById(this.cursoSeleccionado.necesidadCurso.ncuId).subscribe(datanece=> {
                      console.log(datanece);
                    
                      this.cursoSeleccionado.necesidadCurso = datanece
                
                      this.cursoSeleccionado.disenoCurricular =  this.selectedIdDisenoCurricular
                      this.disenoCurrServ.getById(this.cursoSeleccionado.disenoCurricular.dcuId).subscribe(datadiseno=> {
                        console.log(datadiseno);
                      
                        this.cursoSeleccionado.disenoCurricular = datadiseno

                        this.cursoSeleccionado.pcursos =  this.selectedIdPersona
                        this.personaServ.getPorId(this.cursoSeleccionado.pcursos.id_persona).subscribe(datapersona=> {
                          console.log(datapersona);
                        
                          this.cursoSeleccionado.pcursos = datapersona
                          this.cursoSeleccionado.curEstado = true
             this.cursoServ.crearCurso(this.cursoSeleccionado).subscribe(datacursocreado=> {
             console.log(datacursocreado,"creado exitosamente");
           
            })
          })
           })
          })
          })
         })
        })
      })
    })
  }


      
    
  
      
    
    
        
       
        
       
   
    
















  // editarCurso(curso: Curso): void {
  //   this.cursoSeleccionado = Object.assign({}, curso);
  //   this.editando = true;
  //   this.isNew = false; // Actualización del valor de isNew
  // }

  // seleccionarCurso(curso: Curso): void {
  //   this.cursoSeleccionado = Object.assign({}, curso);
  // }

  // submitForm(): void {
  //   if (this.isNew) { // Si se está creando un nuevo curso
  //     console.log('nuevo curso');
  //     this.cursoServ.crearCurso(this.cursoSeleccionado).subscribe(() => {
  //       this.getCursos();
  //       this.cursoSeleccionado = new Curso();
  
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Curso creado',
  //         text: 'El curso ha sido registrado correctamente.',
  //         confirmButtonText: 'Aceptar'
  //       });
  //     }, (error) => {
  //       // Si hay un error al crear el curso, muestra un mensaje de error
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error al crear el curso',
  //         text: 'Ha ocurrido un error al intentar crear el curso. Por favor, intenta de nuevamente.',
  //         confirmButtonText: 'Aceptar'
  //       });
  //     });
  //   } else { // Si se está editando un curso existente
  //     Swal.fire({
  //       icon: 'warning',
  //       title: '¿Estás seguro?',
  //       text: '¿Deseas editar este curso?',
  //       showCancelButton: true,
  //       confirmButtonText: 'Editar',
  //       cancelButtonText: 'Cancelar'
  //     }).then((result) => {
  //       if (result.isConfirmed) { // Si el usuario confirma la edición
  //         this.cursoServ.update(this.cursoSeleccionado, this.cursoSeleccionado.curId).subscribe(() => {
  //           this.getCursos();
  //           this.cursoSeleccionado = new Curso();
  //           this.isNew = true;
  
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Curso editado',
  //             text: 'El curso ha sido modificado correctamente.',
  //             confirmButtonText: 'Aceptar'
  //           });
  //         }, (error) => {
  //           // Si hay un error al editar el curso, muestra un mensaje de error
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error al editar el curso',
  //             text: 'Ha ocurrido un error al intentar editar el curso. Por favor, intenta nuevamente.',
  //             confirmButtonText: 'Aceptar'
  //           });
  //         });
  //       }
  //     });
  //   }
  // }
  


  // eliminarCurso(curId: number): void {
  //   Swal.fire({
  //     title: '¿Está seguro que desea eliminar este curso?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Eliminar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.cursoServ.delete(curId).subscribe(() => {
  //         this.getCursos();
  //       });
  //     }
  //   });
  // }

  //Cargar datos de las relaciones de curso en las vistas


 

  /*getEspecialidades(): void {
    this.especialidadServ.getAllTrue().subscribe((especialidades) => (this.especialidades = especialidades));
  }*/



 
  

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