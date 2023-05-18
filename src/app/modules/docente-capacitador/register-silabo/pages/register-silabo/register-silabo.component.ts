import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';

import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosDidacticos';
import { ContenidocurservService } from 'src/app/shared/Services/DatosSilaboServ/contenidocurserv.service';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { EstrategiasmetservService } from 'src/app/shared/Services/DatosSilaboServ/estrategiasmetserv.service';
import { EvaluaepraService } from 'src/app/shared/Services/DatosSilaboServ/evaluaepra.service';
import { HorasaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/horasaprendizajeserv.service';
import { RecursosdidacticosservService } from 'src/app/shared/Services/DatosSilaboServ/recursosdidacticosserv.service';
import { ResultadosaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/resultadosaprendizajeserv.service';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';


interface ResultadosAprendizaje {
  rapId: number;
  rapUnidadcompe: string;
  rapResultadosaprenactiv: string;
  rapElementoscompe: string;
  rapFormaevidenciar: string;
  rapEstado: boolean;
  rapSilabo: Datossilabo;

 
  
}
interface EvaluacionEpra {
  eraId: number ;
  eraTipoactividades?: String;
  eraCantactvidades?: number;
  eraPorcentcalificacion?: number;
  eraTotal?: number;
  eraEstado?: boolean;
  eraSilabo: Datossilabo;
 
  
}
interface ContenidosCurso {
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
interface EstrategiasMetodologicas {
  emeId: number ;
  emeEstrategia?: String;
  emeFinalidad?: String;
  emeEstado?: boolean;
  emeSilabo: Datossilabo;
}



@Component({
  selector: 'app-register-silabo',
  templateUrl: './register-silabo.component.html',
  styleUrls: ['./register-silabo.component.css']
})

export class RegisterSilaboComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router,private formbuilder:FormBuilder,private Datossilaserv:DatossilaboservService,
    private recursosdidacticosserv: RecursosdidacticosservService,private horasaprenserv:HorasaprendizajeservService,
    private resultadosaprendiserv:ResultadosaprendizajeservService,private evaluacionEpraserv:EvaluaepraService,
    private contenidoserv: ContenidocurservService,private estartegiaser:EstrategiasmetservService)
  {
      
      _CargarSc.carga3(["silabo"])
  }

  agregarVinetas(): void {
    const textarea = document.getElementById("ccuContenidos") as HTMLTextAreaElement;
    textarea.value += "\u2022 "; // Agrega una viñeta al principio de la línea
  }

  agregarLine(): void {
    const textarea = document.getElementById("ccuContenidos") as HTMLTextAreaElement;
    textarea.value += "\n_____________________________________\n"; // Agrega una línea de división
  }
  agregarLinecome(): void {
    const textarea = document.getElementById("elementos_competencias_{{i}}") as HTMLTextAreaElement;
    textarea.value += "\n_____________________________________\n"; // Agrega una línea de división
  }

  agregarVinetasResultadoApren(): void {
    const textarea = document.getElementById("ccuContenidos") as HTMLTextAreaElement;
    textarea.value += "\u2022 "; // Agrega una viñeta al principio de la línea
  }

  textInput: string = '';

  addBullet(inputBox:   HTMLTextAreaElement): void {
    inputBox.value += ' • ';
  }

  addLINE(inputBox:   HTMLTextAreaElement): void {
    inputBox.value += '_____________________________________________';
  }
  mostrarVinetas = false;
mostrarLinea = false;
vinetaIndex: number | undefined;



agregarVinetas2(rowIndex: number) {
  // Asignar el índice de fila actual
  this.vinetaIndex = rowIndex;

  // Obtener el contenido actual de la fila
  const currentContenido = this.contenidosCurso[this.vinetaIndex].ccuContenidos;

  // Agregar las viñetas al contenido actual
  const nuevoContenido = this.mostrarVinetas ? `${currentContenido}\n• ` : `• `;


  // Actualizar el contenido en la fila actual
  this.contenidosCurso[this.vinetaIndex].ccuContenidos = nuevoContenido;
  this.vinetaIndex = undefined;

}


  



  silaboForm!: FormGroup;
  datosSila!: Datossilabo;

  
  datossilabo: Datossilabo = new Datossilabo;
  recurdidactico: RecursosDidacticos = new RecursosDidacticos;
  horasapren: HorasAprendizaje = new HorasAprendizaje;

 
  resultadosAprendizajes: ResultadosAprendizaje[] = [];

  evaluacioneprea: EvaluacionEpra[] = [];

  contenidosCurso: ContenidosCurso[] = [];

  estrategiasMetodologicas: EstrategiasMetodologicas[] = [];



  ngOnInit(): void {
      
        this.datossilabo.dsiDescripcioncurso= '';
        this.datossilabo.dsiPrerrequisitos = '';
        this.datossilabo.dsiObjetivogeneralc = '';
        this.datossilabo.dsiBibliografia = '';
        this.datossilabo.dsiIdentificador = '';
        this.datossilabo.dsiEstado = true;     
//recurso didactico
        this.recurdidactico.rdiMateaudiovisula = '';    
        this.recurdidactico.rdiMateconvencional = '';     
        this.recurdidactico.rdiEstado = true;      
// horas aprendizaje
        this.horasapren.hapPracticas=0;
        this.horasapren.hapDocencia=0;
        this.horasapren.hapTrabajoAutonomo=0;
        this.horasapren.hapEstado=true;
        //
       



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
          rapSilabo: this.datossilabo ,
          
        };
        this.resultadosAprendizajes.push(nuevaFila);

        //evaluacion epra 
      }
      eliminarFilaepra(index: number) {
        this.evaluacioneprea.splice(index, 1);
      }
      public agregarFilaevaluaepra() {
        const nuevaFilaepra: EvaluacionEpra = {
          eraId: 0,
          eraTipoactividades: '',
          eraCantactvidades: 0,
          eraPorcentcalificacion: 0,
          eraTotal: 0,
          eraEstado:true,
          eraSilabo: this.datossilabo ,

          
        };
        this.evaluacioneprea.push(nuevaFilaepra);
      }
      
      // contenidos del curso 

      eliminarFilacontenidocurso(index: number) {
        this.contenidosCurso.splice(index, 1);
      }
      public agregarFilaevacontenidocur() {
        const nuevaFilacontent: ContenidosCurso = {
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
          ccuSilabo: this.datossilabo ,
        };
        this.contenidosCurso.push(nuevaFilacontent);
      }
      // estrategia metodologica

      eliminarFilaestrategia(index: number) {
        this,this.estrategiasMetodologicas.splice(index, 1);
      }
      public agregarFilaevaestrategia() {
        const nuevaFilaestrategi: EstrategiasMetodologicas = {
          emeId:0,
          emeEstrategia: '',
          emeFinalidad: '',
          emeEstado:true,
          emeSilabo: this.datossilabo ,
        };
        this.estrategiasMetodologicas.push(nuevaFilaestrategi);
      }
      

    


crearsilabo() {
  // Establecer el estado del objeto datos silabo
  this.datossilabo.dsiEstado = true;

  // Post de datos silabo
  this.Datossilaserv.post(this.datossilabo).subscribe(silabdata => {
    console.log(silabdata, "Data datos silabo");

    // Asignar el id del silabo a cada objeto de la tabla "resultados de aprendizaje"
    this.resultadosAprendizajes.forEach(resultado => {
      
      resultado.rapSilabo = {
        dsiId: silabdata.dsiId,
        dsiIdentificador: silabdata.dsiIdentificador,
        dsiPrerrequisitos: silabdata.dsiPrerrequisitos,
        dsiDescripcioncurso: silabdata.dsiDescripcioncurso,
        dsiObjetivogeneralc: silabdata.dsiObjetivogeneralc,
        dsiBibliografia: silabdata.dsiBibliografia,
        dsiEstado: silabdata.dsiEstado
      };
    });
// evaluacion epra 
    this.evaluacioneprea.forEach(resultado => {
      
      resultado.eraSilabo = {
        dsiId: silabdata.dsiId,
        dsiIdentificador: silabdata.dsiIdentificador,
        dsiPrerrequisitos: silabdata.dsiPrerrequisitos,
        dsiDescripcioncurso: silabdata.dsiDescripcioncurso,
        dsiObjetivogeneralc: silabdata.dsiObjetivogeneralc,
        dsiBibliografia: silabdata.dsiBibliografia,
        dsiEstado: silabdata.dsiEstado
      };
    });
// CONTENIDOS DEL CURSO
this.contenidosCurso.forEach(resultado => {
      
  resultado.ccuSilabo = {
    dsiId: silabdata.dsiId,
    dsiIdentificador: silabdata.dsiIdentificador,
    dsiPrerrequisitos: silabdata.dsiPrerrequisitos,
    dsiDescripcioncurso: silabdata.dsiDescripcioncurso,
    dsiObjetivogeneralc: silabdata.dsiObjetivogeneralc,
    dsiBibliografia: silabdata.dsiBibliografia,
    dsiEstado: silabdata.dsiEstado
  };
});
//estrategias metodologicas 
this.estrategiasMetodologicas.forEach(resultado => {
      
  resultado.emeSilabo = {
    dsiId: silabdata.dsiId,
    dsiIdentificador: silabdata.dsiIdentificador,
    dsiPrerrequisitos: silabdata.dsiPrerrequisitos,
    dsiDescripcioncurso: silabdata.dsiDescripcioncurso,
    dsiObjetivogeneralc: silabdata.dsiObjetivogeneralc,
    dsiBibliografia: silabdata.dsiBibliografia,
    dsiEstado: silabdata.dsiEstado
  };
});
    // Post de resultados de aprendizaje

    this.resultadosaprendiserv.postMany(this.resultadosAprendizajes).subscribe(
      dataresultados => {
        console.log(dataresultados)
        console.log("resultadosAprendizaje creados exitosamente");
      },
      error => {
        console.log("Error al crear resultadosAprendizaje:", error);
      }
    );
    //POST DE EVALUACION EPRA
    this.evaluacionEpraserv.postMany(this.evaluacioneprea).subscribe(
      dataresultados => {
        console.log("evaluacionepra creados exitosamente");
      },
      error => {
        console.log("Error al crear evaluacionepra:", error);
      }
    );
    // POST DE CONTENIDOS DEL CURSO 
    this.contenidoserv.postMany(this.contenidosCurso).subscribe(
      dataresultados => {
        console.log("contenidos creados exitosamente");
      },
      error => {
        console.log("Error al crear contenidos:", error);
      }
    );
    //Post de estrategias metodologicas 
    this.estartegiaser.postMany(this.estrategiasMetodologicas).subscribe(
      dataresultados => {
        console.log("estrategias creados exitosamente");
      },
      error => {
        console.log("Error al crear estrategias:", error);
      }
    );

    // Asignar el id del silabo a cada objeto de la tabla "recursos didacticos"
    this.recurdidactico.rdiEstado = true;
    this.recurdidactico.rdiSilabo = silabdata;

    // Post de recursos didacticos
    this.recursosdidacticosserv.post(this.recurdidactico).subscribe(datarecurso => {
      console.log(datarecurso, "Data recurso didactico");

      // Asignar el id del silabo a cada objeto de la tabla "horas aprendizaje"
      this.horasapren.hapEstado = true;
      this.horasapren.hapSilabo = silabdata;

      // Post de horas aprendizaje
      this.horasaprenserv.post(this.horasapren).subscribe(datahora => {
        console.log(datahora, "Data horas aprendizaje");
      });
    });
  });
}





}
