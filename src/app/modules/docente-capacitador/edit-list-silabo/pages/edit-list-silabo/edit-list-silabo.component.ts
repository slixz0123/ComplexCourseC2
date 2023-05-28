import { Component, HostListener, Renderer2 } from '@angular/core';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { ContenidocurservService } from 'src/app/shared/Services/DatosSilaboServ/contenidocurserv.service';

import { ResultadosaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/resultadosaprendizajeserv.service';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';
import { EstrategiasmetservService } from 'src/app/shared/Services/DatosSilaboServ/estrategiasmetserv.service';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosDidacticos';
import { RecursosdidacticosservService } from 'src/app/shared/Services/DatosSilaboServ/recursosdidacticosserv.service';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';
import { EvaluaepraService } from 'src/app/shared/Services/DatosSilaboServ/evaluaepra.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { Curso } from 'src/app/Core/models/curso';
import Swal from 'sweetalert2';

interface ResultadosAprendizajes {
  rapId: Number;
  rapUnidadcompe: String;
  rapResultadosaprenactiv: String;
  rapElementoscompe: String;
  rapFormaevidenciar: String;
  rapEstado: Boolean;
  rapSilabo: Datossilabo;

  
}
interface EvaluacionEpras {
  eraId: number ;
  eraTipoactividades?: String;
  eraCantactvidades?: number;
  eraPorcentcalificacion?: number;
  eraTotal?: number;
  eraEstado?: boolean;
  eraSilabo: Datossilabo;
 
  
}
interface ContenidosCursos {
  ccuId: number ;
  ccuDia: number ;
  ccuContenidos?: String;
  ccuHorasclase?: number;
  ccuActividaddocencia?: String;
  ccuHoraspractica?: number;
  ccuActividadpractica?: String;
  ccuHorastrabajoauto?: number;
  ccuActividadtrabajoauto?: String;
  ccuObservaciones?: String;
  ccuEstado?: boolean;
  ccuSilabo: Datossilabo;
 
  
}
interface EstrategiasMetodologicass {
  emeId: number ;
  emeEstrategia?: String;
  emeFinalidad?: String;
  emeEstado?: boolean;
  emeSilabo: Datossilabo;
}


@Component({
  selector: 'app-edit-list-silabo',
  templateUrl: './edit-list-silabo.component.html',
  styleUrls: ['./edit-list-silabo.component.css']
})
export class EditListSilaboComponent {
  
 
  addBullet(inputBox:   HTMLTextAreaElement): void {
    inputBox.value += ' • ';
  }

  addLINE(inputBox:   HTMLTextAreaElement): void {
    inputBox.value += '_____________________________________________';
  }
 

  silaboForm!: FormGroup;




  horasapren: HorasAprendizaje = new HorasAprendizaje;



 ////////////////////////////////////////////////////////////////////////////////////////////
  evaluacioneprea: EvaluacionEpras[] = [];

  contenidosCurso: ContenidosCursos[] = [];

  estrategiasMetodologicas: EstrategiasMetodologicass[] = [];

  resultadosAprendizajes: ResultadosAprendizajes[]=[];

//////////////////////////////// METODOS PARA CARGAR EN LA TABLA //////////////////////////////////////////////////////////
  //SILABO ////////////////////////////////////////////////////////
  datossilan?: Datossilabo[];
  datos: Datossilabo = new Datossilabo(); 
  selectedIdsilabo: Datossilabo = new Datossilabo();
 
 //contenedor curso ////////////////////////////////////////////////////////
  contencurso: ContenidosCurso[]=[];
  contencur: ContenidosCurso = new ContenidosCurso(); 
  selectedIdcontenido: ContenidosCurso = new ContenidosCurso();
  getContenidosPorSilaboId(silaboId: number): any[] {
    return this.contencurso.filter(dataconten => dataconten.ccuSilabo.dsiId === silaboId);
   
  }
// resultados de aprtendizaje  ////////////////////////////////////////////////////////
resultaprendi: ResultadosAprendizaje = new ResultadosAprendizaje (); 


  getContenidosResultadosAprendId(aprendoId: number): any[] {
  return this.resultadosAprendizajes.filter(dataresult => dataresult.rapSilabo.dsiId === aprendoId);
 
  }
//estrategias ////////////////////////////////////////////////////////
  estrategiasmetodo: EstrategiasMetodologicas[]=[];
  estrategiasme: EstrategiasMetodologicas = new EstrategiasMetodologicas(); 

  getEstrategiasId(estrategiasId: number): any[] {
  return this.estrategiasmetodo.filter(dataestrate => dataestrate.emeSilabo.dsiId === estrategiasId);
 }
// recursos didacticos  ////////////////////////////////////////////////////////
  recursosDidacticos: RecursosDidacticos[]=[];
  recursosDidactic: RecursosDidacticos = new RecursosDidacticos(); 
 
  getrecurdidaIdb(recurdidaId: number): any[] {
    return this.recursosDidacticos.filter(datarecursodida => datarecursodida.rdiSilabo.dsiId === recurdidaId); 
  }
// eva aprendi didacticos ////////////////////////////////////////////////////////
  evaluacionEpra: EvaluacionEpra[]=[];
  evaluacionEp: EvaluacionEpra = new EvaluacionEpra(); 
  selectedIdEVA: EvaluacionEpra = new EvaluacionEpra();
  getevaId(evapraId: number): any[] {
      return this.evaluacionEpra.filter(datareva => datareva.eraSilabo.dsiId === evapraId);
    }


///////////////////////////////////////////CONSTRUCTOR//////////////////////////////////////////////////////////////
  constructor( private diaserv: DiasService ,private necesidadserv:NecesidadCursoService,
    private router : Router,private _CargarSc: CargarjsTemplatesService,
    private formBuilder:FormBuilder, private datosilabserv:DatossilaboservService,
    private contencursoserv:ContenidocurservService, private resultaprendiserv: ResultadosaprendizajeservService,
    private estrateserv:EstrategiasmetservService, private recurdidacticoserv: RecursosdidacticosservService,
    private evapraserv:EvaluaepraService, private formbuilder:FormBuilder){
    _CargarSc.carga3(["modal"]),
    _CargarSc.carga3(["tablasilab"])
  }

 /////////////////////////////////////////////////////ngOnInit///////////////////////////////////////////////////////////

ngOnInit(): void {

  // datos silabo
  this.datosilabserv.getAll().subscribe(Datosilab => {
    this.datossilan = Datosilab.filter(Datosilab => Datosilab.dsiEstado !== false);
    //contenido del curso 
     this.contencursoserv.getAll().subscribe(dataconten => {
      console.log(dataconten)
      this.contencurso = dataconten.filter(dataconten => dataconten.ccuEstado !== false &&   dataconten.ccuSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === dataconten.ccuSilabo.dsiId) );
      // resultado de parendizaje 
       this.resultaprendiserv.getAll().subscribe(dataresult => {
        console.log(dataresult)
         this.resultadosAprendizajes = dataresult.filter(dataresult => dataresult.rapEstado !== false );    
          // estategias metodologicas 
          this.estrateserv.getAll().subscribe(dataestrate => {
           console.log(dataestrate)
            this.estrategiasmetodo = dataestrate.filter(dataestrate => dataestrate.emeEstado !== false &&   dataestrate.emeSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === dataestrate.emeSilabo.dsiId) );
          // RESULTADOS DE APRENDIZAJE 
            this.resultaprendiserv.getAll().subscribe(datare => {
              console.log(datare,"data resultado aprend")
            })

         });

      });
    });
     // Recursos didacticos
     this.recurdidacticoserv.getAll().subscribe(datarecursodida => {
      console.log(datarecursodida,"didacticos")
      this.recursosDidacticos = datarecursodida.filter(datarecursodida => datarecursodida.rdiEstado !== false &&   datarecursodida.rdiSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === datarecursodida.rdiSilabo.dsiId) );

       });
       // evaluacion eprea 
       this.evapraserv.getAll().subscribe(datareva => {
        console.log(datareva,"eva")
        this.evaluacionEpra = datareva.filter(datareva => datareva.eraEstado !== false &&   datareva.eraSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === datareva.eraSilabo.dsiId) );

        
  
         });
  });
  

    this.datos.dsiDescripcioncurso= '';
    this.datos.dsiPrerrequisitos = '';
    this.datos.dsiObjetivogeneralc = '';
    this.datos.dsiBibliografia = '';
    this.datos.dsiIdentificador = '';
    this.datos.dsiEstado = true;     
    //recurso didactico
    this.recursosDidactic.rdiMateaudiovisula = '';    
    this.recursosDidactic.rdiMateconvencional = '';     
    this.recursosDidactic.rdiEstado = true;      
    // horas aprendizaje
    this.horasapren.hapPracticas=0;
    this.horasapren.hapDocencia=0;
    this.horasapren.hapTrabajoAutonomo=0;
    this.horasapren.hapEstado=true;
    //resultados
    this.resultaprendi.rapElementoscompe='';
     this.resultaprendi.rapFormaevidenciar='';
     this.resultaprendi.rapResultadosaprenactiv='';
    this.resultaprendi.rapUnidadcompe='';
   this.resultaprendi.rapEstado=true;




    this.silaboForm = this.formbuilder.group({

      dsiDescripcioncurso: ['', Validators.required],
      dsiPrerrequisitos: ['', Validators.required],
      dsiObjetivogeneralc: ['', Validators.required],
      dsiIdentificador: ['', Validators.required],
      dsiBibliografia: ['', Validators.required],
      dsiEstado: ['', Validators.required],
      //recurdida
      rdiMateaudiovisula: ['', Validators.required],
      rdiMateconvencional: ['', Validators.required],
      rdiEstado: ['', Validators.required],
      //horas aprendi
      hapPracticas: ['', Validators.required],
      hapDocencia: ['', Validators.required],
      hapTrabajoAutonomo: ['', Validators.required],
      // evaluacio epra
      eraTipoactividades: ['', Validators.required],
      eraCantactvidades: ['', Validators.required],
      eraPorcentcalificacion: ['', Validators.required],
      eraTotal: ['', Validators.required],
      //contenidos del curso 
      ccuId: ['', Validators.required],
      ccuDia: ['', Validators.required],
      ccuContenidos :['', Validators.required],
      ccuHorasclase: ['', Validators.required],
      ccuActividaddocencia: ['', Validators.required],
      ccuHoraspractica: ['', Validators.required],
      ccuActividadpractica: ['', Validators.required],
      ccuHorastrabajoauto: ['', Validators.required],
      ccuActividadtrabajoauto: ['', Validators.required],
      ccuObservaciones: ['', Validators.required],
      ccuEstado: ['', Validators.required],
      //estrategia metodologica
      emeId: ['', Validators.required],
      emeEstrategia: ['', Validators.required],
      emeFinalidad: ['', Validators.required],
      emeEstado: ['', Validators.required]

    
    

    });
    this.silaboForm = new FormGroup({
    
      dsiDescripcioncurso: new FormControl(),
      dsiPrerrequisitos: new FormControl(),
      dsiObjetivogeneralc: new FormControl(),
      dsiIdentificador: new FormControl(),
      dsiBibliografia: new FormControl(),
      dsiEstado: new FormControl(),
      //recurdida
      rdiMateaudiovisula: new FormControl(),
      rdiMateconvencional: new FormControl(),
      rdiEstado: new FormControl(),
      //horas aprendi
      hapPracticas: new FormControl(),
      hapDocencia: new FormControl(),
      hapTrabajoAutonomo: new FormControl(),

    //RESULTYADOS DE APRENDIZAJE 
    rapUnidadcompe: new FormControl(),
    rapElementoscomp: new FormControl(),
    rapResultadosaprenactiv: new FormControl(),
    rapFormaevidenciar: new FormControl(),
    //evaluacion epra 
    eraTipoactividades: new FormControl(),
      eraCantactvidades: new FormControl(),
      eraPorcentcalificacion: new FormControl(),
      eraTotal: new FormControl(),
    // contenidos del curso 


      ccuDia: new FormControl(),
      ccuContenidos : new FormControl(),
      ccuHorasclase: new FormControl(),
      ccuActividaddocencia: new FormControl(),
      ccuHoraspractica: new FormControl(),
      ccuActividadpractica: new FormControl(),
      ccuHorastrabajoauto: new FormControl(),
      ccuActividadtrabajoauto: new FormControl(),
      ccuObservaciones: new FormControl(),
      ccuEstado: new FormControl(),

      //estrategia metodologica 

      emeId: new FormControl(),
      emeEstrategia: new FormControl(),
      emeFinalidad: new FormControl(),
      emeEstado: new FormControl(),
    });

   
  
}

eliminarFila(index: number) {
  this.resultadosAprendizajes.splice(index, 1);
}
public agregarFila() {
  const nuevaFila: ResultadosAprendizaje = {
    rapId: 0,
    rapUnidadcompe: '',
    rapElementoscompe: '', // Asignar la propiedad "rapElementoscomp" aquí
    rapResultadosaprenactiv: '',
    rapFormaevidenciar: '',
    rapEstado:true,
    rapSilabo: this.datos ,
    
  };
  this.resultadosAprendizajes.push(nuevaFila);

  //evaluacion epra 
}
eliminarFilaepra(index: number) {
  this.evaluacioneprea.splice(index, 1);
}
public agregarFilaevaluaepra() {
  const nuevaFilaepras: EvaluacionEpras = {
    eraId: 0,
    eraTipoactividades: '',
    eraCantactvidades: 0,
    eraPorcentcalificacion: 0,
    eraTotal: 0,
    eraEstado:true,
    eraSilabo: this.datos ,

    
  };
  this.evaluacioneprea.push(nuevaFilaepras);
}

// contenidos del curso 

eliminarFilacontenidocurso(index: number) {
  this.contenidosCurso.splice(index, 1);
}
public agregarFilaevacontenidocur() {
  const nuevaFilacontent: ContenidosCursos = {
    ccuId:0,
    ccuDia: 0,
    ccuContenidos: '',
    ccuHorasclase: 0,
    ccuActividaddocencia: '',
    ccuHoraspractica: 0,
    ccuActividadpractica: '',
    ccuHorastrabajoauto: 0,
    ccuActividadtrabajoauto: '',
    ccuObservaciones: '',
    ccuEstado:true,
    ccuSilabo: this.datos ,
  };
  this.contenidosCurso.push(nuevaFilacontent);
}
// estrategia metodologica

eliminarFilaestrategia(index: number) {
  this,this.estrategiasMetodologicas.splice(index, 1);
}
public agregarFilaevaestrategia() {
  const nuevaFilaestrategi: EstrategiasMetodologicass = {
    emeId:0,
    emeEstrategia: '',
    emeFinalidad: '',
    emeEstado:true,
    emeSilabo: this.datos ,
  };
  this.estrategiasMetodologicas.push(nuevaFilaestrategi);
}

// Variables para almacenar los datos seleccionados
public dtsilabselec: any;
public dtresultselec: any;
public dtcontenidoselec: any; 
public registroSeleccionado: any;
datossilabo: Datossilabo = new Datossilabo;
selecdatosilab(datossila: any, id: number) {
  this.registroSeleccionado = datossila;
  this.dtsilabselec = datossila;
  this.dtsilabselec.dsiId = datossila.dsiId;

  // Obtener los datos de dataresult utilizando las funciones correspondientes
  const dataresult = this.getContenidosResultadosAprendId(id)[0]; // Obtén el primer elemento de la lista
  const idresult = dataresult.rapId;

  this.dtresultselec = dataresult;
  this.dtresultselec.rapId = idresult;

  // Obtener los datos de datresult utilizando la función correspondiente
  this.resultaprendiserv.getById(idresult).subscribe(datresult => {
    console.log(datresult);
  });

  // Obtener los datos de dataconte utilizando las funciones correspondientes
  const dataconte = this.getContenidosPorSilaboId(id)[0]; // Obtén el primer elemento de la lista
  const iddata = dataconte.ccuId;
  this.dtcontenidoselec = dataconte;
  this.dtcontenidoselec.ccuId = idresult;

  // Obtener los datos de dataconte utilizando la función correspondiente
  this.contencursoserv.getById(iddata).subscribe(dataconte => {
    console.log(dataconte);
  });
}


editarsilabo(sialboedit:Datossilabo,id_silabo:number){
  
  this.datosilabserv.getById(id_silabo).subscribe(
    data =>{
      console.log(data ,"encontrado")
       
     this.datosilabserv.update(sialboedit,sialboedit.dsiId).subscribe(
       data=>{
        sialboedit.dsiIdentificador=this.dtsilabselec.dsiIdentificador
        sialboedit.dsiPrerrequisitos=this.dtsilabselec.dsiPrerrequisitos
        sialboedit.dsiObjetivogeneralc=this.dtsilabselec.dsiObjetivogeneralc
        sialboedit.dsiBibliografia=this.dtsilabselec.dsiBibliografia
        sialboedit.dsiDescripcioncurso=this.dtsilabselec.dsiDescripcioncurso
        sialboedit.dsiId=this.dtsilabselec.dsiId

         console.log(data,"actualizado");

         this.dtsilabselec = data;
         this.resultaprendiserv.update(this.dtresultselec,this.dtresultselec.rapId).subscribe(
          data=>{
            console.log(data,"resultado de apendizaje")
            this.dtresultselec = data 
          })
          
         this.contencursoserv.update(this.dtcontenidoselec,this.dtcontenidoselec.ccuId).subscribe(
          data=>{
            console.log(data,"contenido curso")
            this.dtresultselec = data

          })
        },
       error => {
        console.error(error);})
      },error => {
      console.error(error);
    }
  )
}








eliminar(ncuId: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el registro del silabo',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.datosilabserv.delete(this.datos, ncuId).subscribe(
        (data) => {
          console.log(data);
          this.datos = data;

          this.contencursoserv.delete(this.contencur, this.contencur.ccuSilabo.dsiId).subscribe(
            (data) => {
              console.log(data);
              this.contencur = data;

              this.resultaprendiserv.delete(this.resultaprendi, this.resultaprendi.rapSilabo.dsiId).subscribe(
                (data) => {
                  console.log(data);
                  this.resultaprendi = data;
                }
              );
            }
          );
          window.location.reload();
          Swal.fire('Eliminado', 'El registro del silabo ha sido eliminado correctamente', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Ha ocurrido un error al eliminar el registro del silabo', 'error');
        }
      );
    }
  });
}





  //  editadia(neceedit:NecesidadCurso,id_dia:number){
  
  //   this.necesidadserv.getById(id_dia).subscribe(
  //     data =>{
  //       console.log(data ,"encontrado")
         
  //      this.necesidadserv.update(neceedit,neceedit.ncuId).subscribe(
  //        data=>{
  //         neceedit.ncuLugardicta=this.neceseleccionada.ncuLugardicta
  //         neceedit.dia=this.neceseleccionada.dia
  //         neceedit.ncuFechaprevisfin=this.neceseleccionada.ncuFechaprevisfin
  //         neceedit.ncuNumparticipantes=this.neceseleccionada.ncuNumparticipantes
  //         neceedit.ncuResumenyproyecto=this.neceseleccionada.ncuResumenyproyecto
  //         neceedit.ncuPoblaciondirigida=this.neceseleccionada.ncuPoblaciondirigida
  //         neceedit.ncuId=this.neceseleccionada.ncuId
  //          console.log(data,"actualixado");
  
          
         
  //          this.necesidad = data;
  //         },
  //        error => {
  //         console.error(error);})
  //       },error => {
  //       console.error(error);
  //     }
  
  //   )
  
  // }


  

}
