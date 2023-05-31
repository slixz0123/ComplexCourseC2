import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';


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
import Swal from 'sweetalert2';


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
 

 
  resultadosAprendizajes: ResultadosAprendizaje[] = [];

  evaluacioneprea: EvaluacionEpra[] = [];

  contenidosCurso: ContenidosCurso[] = [];

  estrategiasMetodologicas: EstrategiasMetodologicas[] = [];

  horasapren: HorasAprendizaje = new HorasAprendizaje;

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
          eraTotal: [{value: '', disabled: true}],
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
      resultevaControls: FormGroup[] = [];
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

        const grupo3 = new FormGroup({
         
          rapUnidadcompe: new FormControl(nuevaFila.rapUnidadcompe),
          rapElementoscompe: new FormControl(nuevaFila.rapElementoscompe), // Asignar la propiedad "rapElementoscomp" aquí
          rapResultadosaprenactiv: new FormControl(nuevaFila.rapResultadosaprenactiv),
          rapFormaevidenciar: new FormControl(nuevaFila.rapFormaevidenciar),
         
        });
        this.resultevaControls.push(grupo3);
        //evaluacion epra 
      }

      rapUnidadcompe(index: number): FormControl {
        const grupo3 = this.resultevaControls[index].get('rapUnidadcompe') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        grupo3.valueChanges.subscribe(value => {
          this.resultadosAprendizajes[index].rapUnidadcompe = value;
        });
      
        return grupo3;
      }
      rapElementoscompe(index: number): FormControl {
        const grupo3 = this.resultevaControls[index].get('rapElementoscompe') as FormControl;
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        grupo3.valueChanges.subscribe(value => {
          this.resultadosAprendizajes[index].rapElementoscompe = value;
        });
      
        return grupo3;
      }
      rapResultadosaprenactiv(index: number): FormControl {
        const grupo3 = this.resultevaControls[index].get('rapResultadosaprenactiv') as FormControl;
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        grupo3.valueChanges.subscribe(value => {
          this.resultadosAprendizajes[index].rapResultadosaprenactiv = value;
        });
      
        return grupo3;
      }
      rapFormaevidenciar(index: number): FormControl {
        const grupo3 = this.resultevaControls[index].get('rapFormaevidenciar') as FormControl;
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        grupo3.valueChanges.subscribe(value => {
          this.resultadosAprendizajes[index].rapFormaevidenciar = value;
        });
      
        return grupo3;
      }













      eliminarFilaepra(index: number) {
        this.evaluacioneprea.splice(index, 1);
      }
      filaevaepreaControls: FormGroup[] = [];
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
        const grupo2 = new FormGroup({
          eraTipoactividades: new FormControl(nuevaFilaepra.eraTipoactividades),
          eraCantactvidades: new FormControl(nuevaFilaepra.eraCantactvidades),
          eraPorcentcalificacion: new FormControl(nuevaFilaepra.eraPorcentcalificacion),
          eraTotal: new FormControl(nuevaFilaepra.eraTotal),

        });
        this.filaevaepreaControls.push(grupo2);
      }

      eraTipoactividades(index: number): FormControl {
        const control2 = this.filaevaepreaControls[index].get('eraTipoactividades') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.evaluacioneprea[index].eraTipoactividades = value;
        });
        return control2
      }
      eraCantactvidades(index: number): FormControl {
        const control2 = this.filaevaepreaControls[index].get('eraCantactvidades') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.evaluacioneprea[index].eraCantactvidades = value;
        });
        return control2
      }
      eraPorcentcalificacion(index: number): FormControl {
        const control2 = this.filaevaepreaControls[index].get('eraPorcentcalificacion') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.evaluacioneprea[index].eraPorcentcalificacion = value;
        });
        return control2
      }

      eraTotal(index: number): FormControl {
        const control2 = this.filaevaepreaControls[index].get('eraTotal') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.evaluacioneprea[index].eraTotal = value;
        });
        return control2
      }





      eraTotales: number[] = [];

      calcularTotal(i: number) {
        const actividades = this.evaluacioneprea[i].eraCantactvidades ?? 0;
        const calificacion = this.evaluacioneprea[i].eraPorcentcalificacion ?? 0;
        const total = actividades + calificacion;
        this.evaluacioneprea[i].eraTotal = total;
        this.eraTotales[i] = total;
      }
      
      
      
      
      
      

      // contenidos del curso 

      eliminarFilacontenidocurso(index: number) {
        this.contenidosCurso.splice(index, 1);
      }
     
    
      contenidoControls: FormGroup[] = [];
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
       
      
        const grupo2 = new FormGroup({
          ccuDia: new FormControl(nuevaFilacontent.ccuDia),
          ccuContenidos: new FormControl(nuevaFilacontent.ccuContenidos),
          ccuHorasclase: new FormControl(nuevaFilacontent.ccuHorasclase),
          ccuActividaddocencia: new FormControl(nuevaFilacontent.ccuActividaddocencia),
          ccuHoraspractica: new FormControl(nuevaFilacontent.ccuHoraspractica),
          ccuActividadpractica: new FormControl(nuevaFilacontent.ccuActividadpractica),
          ccuHorastrabajoauto: new FormControl(nuevaFilacontent.ccuActividadtrabajoauto),
          ccuActividadtrabajoauto: new FormControl(nuevaFilacontent.ccuActividadtrabajoauto),
          ccuObservaciones: new FormControl(nuevaFilacontent.ccuObservaciones),
         
        });
        this.contenidoControls.push(grupo2);
        
      }
      // eliminarFilaestrategia(index: number) {
      //   this.estrategiasMetodologicas.splice(index, 1);
      //   this.estrategiasControls.splice(index, 1);
      // }
      
   
      ccuDia(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuDia') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuDia = value;
        });
      
        return control2;
      }
      ccuContenidos(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuContenidos') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuContenidos = value;
        });
      
        return control2;
      }
      
      ccuHorasclase(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuHorasclase') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuHorasclase = value;
        });
      
        return control2;
      }
      ccuActividaddocencia(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuActividaddocencia') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuActividaddocencia = value;
        });
      
        return control2;
      }
      ccuHoraspractica(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuHoraspractica') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuHoraspractica = value;
        });
      
        return control2;
      }

      ccuActividadpractica(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuActividadpractica') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuActividadpractica = value;
        });
      
        return control2;
      }
      ccuHorastrabajoauto(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuHorastrabajoauto') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuHorastrabajoauto = value;
        });
      
        return control2;
      }
      ccuActividadtrabajoauto(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuActividadtrabajoauto') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuActividadtrabajoauto = value;
        });
      
        return control2;
      }

      ccuObservaciones(index: number): FormControl {
        const control2 = this.contenidoControls[index].get('ccuObservaciones') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control2 de formulario cambie
        control2.valueChanges.subscribe(value => {
          this.contenidosCurso[index].ccuObservaciones = value;
        });
      
        return control2;
      }
    
    





      // estrategia metodologica

      // eliminarFilaestrategia(index: number) {
      //   this,this.estrategiasMetodologicas.splice(index, 1);
      // }
      estrategiasControls: FormGroup[] = [];

      public agregarFilaevaestrategia() {
        const nuevaFilaestrategi: EstrategiasMetodologicas = {
          emeId:0,
          emeEstrategia: '',
          emeFinalidad: '',
          emeEstado:true,
          emeSilabo: this.datossilabo,
        };
        this.estrategiasMetodologicas.push(nuevaFilaestrategi);
       
      
        const grupo = new FormGroup({
          emeEstrategia: new FormControl(nuevaFilaestrategi.emeEstrategia),
          emeFinalidad: new FormControl(nuevaFilaestrategi.emeFinalidad),
        });
        this.estrategiasControls.push(grupo);
        
      }
      
      eliminarFilaestrategia(index: number) {
        this.estrategiasMetodologicas.splice(index, 1);
        this.estrategiasControls.splice(index, 1);
      }
      
   
      estrategiaControl(index: number): FormControl {
        const control = this.estrategiasControls[index].get('emeEstrategia') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control.valueChanges.subscribe(value => {
          this.estrategiasMetodologicas[index].emeEstrategia = value;
        });
      
        return control;
      }
      
      finalidadControl(index: number): FormControl {
        const control = this.estrategiasControls[index].get('emeFinalidad') as FormControl;
      
        // Actualizar el valor en el modelo de datos cuando el control de formulario cambie
        control.valueChanges.subscribe(value => {
          this.estrategiasMetodologicas[index].emeFinalidad = value;
        });
      
        return control;
      }
      
    
      


crearsilabo() {
  this.datossilabo.dsiEstado = true;

  // Verifica si el formulario es válido
  if (this.silaboForm.valid) {
    // Verifica si los campos de texto y áreas de texto están vacíos
    const inputsVacios = Object.values(this.silaboForm.controls)
      .filter(control => control instanceof FormControl)
      .filter(control => control.value === '')
      .map(control => (control as FormControl));

    if (inputsVacios.length > 0) {
      // Muestra una notificación de Sweet Alert indicando los campos vacíos
      Swal.fire('Error', `Algun campo esta vacíos:` , 'error');
    } else {
      const inputsNumericosInvalidos = Object.values(this.silaboForm.controls)
      .filter(control => control instanceof FormControl && typeof control.value === 'number' && (isNaN(control.value) || control.value === 0))
      .map(control => (control as FormControl));

      if (inputsNumericosInvalidos.length > 0) {
        // Muestra una notificación de Sweet Alert indicando los campos numéricos con letras
        Swal.fire('Error', `Los siguientes campos numéricos contienen letras: ${inputsNumericosInvalidos.join(', ')}`, 'error');
      } else {
    

        // Post de datos silabo
        this.Datossilaserv.post(this.datossilabo).subscribe(silabdata => {
          //console.log(silabdata, "Data datos silabo");

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

          // Evaluacion epra
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

          // Contenidos del curso
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

          // Estrategias metodologicas
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
              //console.log(dataresultados);
              //console.log("resultadosAprendizaje creados exitosamente");
            },
            error => {
              //console.log("Error al crear resultadosAprendizaje:", error);
            }
          );

          // POST DE EVALUACION EPRA
          this.evaluacionEpraserv.postMany(this.evaluacioneprea).subscribe(
            dataresultados => {
              //console.log("evaluacionepra creados exitosamente");
            },
            error => {
              //console.log("Error al crear evaluacionepra:", error);
            }
          );

          // POST DE CONTENIDOS DEL CURSO
          this.contenidoserv.postMany(this.contenidosCurso).subscribe(
            dataresultados => {
              //console.log("contenidos creados exitosamente");
            },
            error => {
              //console.log("Error al crear contenidos:", error);
            }
          );

          // Post de estrategias metodologicas
          this.estartegiaser.postMany(this.estrategiasMetodologicas).subscribe(
            dataresultados => {
              //console.log("estrategias creados exitosamente");
            },
            error => {
              //console.log("Error al crear estrategias:", error);
            }
          );

          // Asignar el id del silabo a cada objeto de la tabla "recursos didacticos"
          this.recurdidactico.rdiEstado = true
          this.recurdidactico.rdiSilabo = silabdata;

          // Post de recursos didacticos
          this.recursosdidacticosserv.post(this.recurdidactico).subscribe(datarecurso => {
            //console.log(datarecurso, "Data recurso didactico");
        
            // Asignar el id del silabo a cada objeto de la tabla "horas aprendizaje"
            
          });
          this.horasapren.hapEstado = true;
            this.horasapren.hapSilabo = silabdata;
        
            // Post de horas aprendizaje
            this.horasaprenserv.post(this.horasapren).subscribe(datahora => {
              console.log(datahora, "Data horas aprendizaje");
            });
        this.silaboForm.reset();
          Swal.fire('Éxito', 'El sílabo se creó correctamente', 'success');
        }, error => {
          //console.log(error, "Error datos silabo");
        
          // Muestra una notificación de Sweet Alert indicando el error al crear el silabo
          Swal.fire('Error', 'Ocurrió un error al crear el sílabo', 'error');
        });
        }
        }

      }
    }

//valid
checkNegative(event: any) {
  const inputValue = event.target.value;

  if (parseInt(inputValue) < 0) {
    event.preventDefault();
    event.target.value = '0';
    // Opcional: Mostrar una notificación o mensaje de error
    Swal.fire({
      title: 'Número inválido',
      text: 'No se permiten números negativos',
      icon: 'error'
    });
  }
}
  






  }






