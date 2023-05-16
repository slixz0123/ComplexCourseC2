import { Component } from '@angular/core';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadcurso';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { NecesidadCursoserviceService } from 'src/app/shared/Services/necesidad-cursoservice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datossilabo';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { ContenidocurservService } from 'src/app/shared/Services/DatosSilaboServ/contenidocurserv.service';
import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/ResultadosAprendizaje';
import { ResultadosaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/resultadosaprendizajeserv.service';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';
import { EstrategiasmetservService } from 'src/app/shared/Services/DatosSilaboServ/estrategiasmetserv.service';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosdidacticos';
import { RecursosdidacticosservService } from 'src/app/shared/Services/DatosSilaboServ/recursosdidacticosserv.service';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';
import { EvaluaepraService } from 'src/app/shared/Services/DatosSilaboServ/evaluaepra.service';

@Component({
  selector: 'app-edit-list-silabo',
  templateUrl: './edit-list-silabo.component.html',
  styleUrls: ['./edit-list-silabo.component.css']
})
export class EditListSilaboComponent {
  dia?: Dias[];
  di: Dias = new Dias(); 
  selectedId: Dias = new Dias();

  datossilan?: Datossilabo[];
  datos: Datossilabo = new Datossilabo(); 
  selectedIdsilabo: Datossilabo = new Datossilabo();
 //contenedor curso
  contencurso: ContenidosCurso[]=[];
  contencur: ContenidosCurso = new ContenidosCurso(); 
  selectedIdcontenido: ContenidosCurso = new ContenidosCurso();
// resultados de aprtendizaje 
resultadosAprendizaje: ResultadosAprendizaje[]=[];
  resultapren: ResultadosAprendizaje = new ResultadosAprendizaje(); 
  selectedIdresultapren: ResultadosAprendizaje = new ResultadosAprendizaje();
//estrategias
  estrategiasmetodo: EstrategiasMetodologicas[]=[];
  estrategiasme: EstrategiasMetodologicas = new EstrategiasMetodologicas(); 
  selectedIdestrategiameto: EstrategiasMetodologicas = new EstrategiasMetodologicas();
// recursos didacticos 
recursosDidacticos: RecursosDidacticos[]=[];
recursosDidactic: RecursosDidacticos = new RecursosDidacticos(); 
selectedIdrecurso: RecursosDidacticos = new RecursosDidacticos();
// eva aprendi didacticos 
evaluacionEpra: EvaluacionEpra[]=[];
evaluacionEp: EvaluacionEpra = new EvaluacionEpra(); 
selectedIdEVA: EvaluacionEpra = new EvaluacionEpra();


  datossilabForm:any
  arraysilba : Datossilabo[]=[];

  seleccionarId(event: any) {
    this.selectedId = event.target?.value ?? 0;
  }
  seleccionarIdcur(event: any) {
    this.selectedIdsilabo = event.target?.value ?? 0;
  }

  seleccionarIdcont(event: any) {
    this.seleccionarIdcont = event.target?.value ?? 0;
  }
  onSelectChange(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }

    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedId.diaId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }


  onSelectChange2(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }

    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedIdsilabo.dsiId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }

  onSelectChange3(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }

    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedIdcontenido.ccuId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }


  constructor( private diaserv: DiasService ,private necesidadserv:NecesidadCursoserviceService,private router : Router,private _CargarSc: CargarjsTemplatesService,private formBuilder:FormBuilder, 
    private datosilabserv:DatossilaboservService,private contencursoserv:ContenidocurservService,
    private resultaprendiserv: ResultadosaprendizajeservService,private estrateserv:EstrategiasmetservService,
    private recurdidacticoserv: RecursosdidacticosservService,
    private evapraserv:EvaluaepraService ){
    _CargarSc.carga3(["modal"])
  }
  sendData3(selectedValue2: number) {

    const payload = { id: selectedValue2 };
    this.diaserv.getPorId( payload).subscribe(
      (response) => {
        console.log('Solicitud POST enviada con éxito:', response);
      },
      (error) => {
        console.log('Error al enviar la solicitud POST:', error);
      }
    );
  }



       



  diaSeleccionada: Dias = new Dias;

selecdia(dia: Dias,id:number) {
  this.diaSeleccionada = dia;
  this.di.diaId = dia.diaId
  this.diaserv.getById(id).subscribe(
    data =>{
      console.log(data)
    }
  )
}



selecdtssilan: Datossilabo = new Datossilabo;

selecnece(nece: Datossilabo,id:number) {
  this.selecdtssilan = nece;
  this.datos.dsiId = nece.dsiId

  this.datosilabserv.getById(id).subscribe(
    data =>{
      console.log(data)
      
    }
  )
}
filteredContencurso: any[] | undefined;

getContenidosPorSilaboId(silaboId: number): any[] {
  return this.contencurso.filter(dataconten => dataconten.ccuSilabo.dsiId === silaboId);
 
}
getContenidosResultadosAprendId(aprendoId: number): any[] {
  return this.resultadosAprendizaje.filter(dataresult => dataresult.rapSilabo.dsiId === aprendoId);
 
}

getEstrategiasId(estrategiasId: number): any[] {
  return this.estrategiasmetodo.filter(dataestrate => dataestrate.emeSilabo.dsiId === estrategiasId);
 
}
getrecurdidaIdb(recurdidaId: number): any[] {
  return this.recursosDidacticos.filter(datarecursodida => datarecursodida.rdiSilabo.dsiId === recurdidaId);
 
}
getevaId(evapraId: number): any[] {
  return this.evaluacionEpra.filter(datareva => datareva.eraSilabo.dsiId === evapraId);
 
}





ngOnInit(): void {
 
  // datos silabo
  this.datosilabserv.getAll().subscribe(Datosilab => {
    this.datossilan = Datosilab.filter(Datosilab => Datosilab.dsiEstado !== false);
    //contenido del curso 
     this.contencursoserv.getAll().subscribe(dataconten => {
      this.contencurso = dataconten.filter(dataconten => dataconten.ccuEstado !== false &&   dataconten.ccuSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === dataconten.ccuSilabo.dsiId) );
      // resultado de parendizaje 
       this.resultaprendiserv.getAll().subscribe(dataresult => {
        console.log(dataresult)
         this.resultadosAprendizaje = dataresult.filter(dataresult => dataresult.rapEstado !== false &&   dataresult.rapSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === dataresult.rapSilabo.dsiId) );    
          // estategias metodologicas 
          this.estrateserv.getAll().subscribe(dataestrate => {
           console.log(dataestrate)
            this.estrategiasmetodo = dataestrate.filter(dataestrate => dataestrate.emeEstado !== false &&   dataestrate.emeSilabo.dsiEstado !== false &&   Datosilab.filter(Datosilab=>Datosilab.dsiId === dataestrate.emeSilabo.dsiId) );
    
          
       
       
       
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
  

 

   
  // this.datosilabserv.getAll().subscribe(Datosilab => {
  //   this.datossilan = Datosilab.filter(Datosilab => Datosilab.dsiEstado !== false);
  
  //   this.contencursoserv.getAll().subscribe(dataconten => {
  //     this.contencurso = dataconten.filter(dataconten => dataconten.ccuEstado !== false && dataconten.ccuSilabo.dsiEstado !== false);
  //     this.filteredContencurso = this.contencurso.filter(conte => {
  //       const silabo = Datosilab.find(dato => dato.dsiId === conte.ccuSilabo.dsiId);
  //       return silabo && silabo.dsiEstado !== false;
  //     });
  //   });
  // });

// this.datosilabserv.getAll().subscribe(Datosilab => {
//     this.datossilan = Datosilab.filter(Datosilab => Datosilab.dsiEstado !== false);
    
//     this.contencursoserv.getAll().subscribe(dataconten => {
//         this.contencurso = dataconten.filter(dataconten => dataconten.ccuEstado !== false && dataconten.ccuSilabo.dsiEstado !== false);

//         this.filteredContencurso = this.contencurso.filter(conte => conte.ccuSilabo.dsiId === this.datos.dsiId);
//     });
// });


  

  this.datossilabForm = this.formBuilder.group({
       
    dsiDescripcioncurso: ['', Validators.required],
    dsiPrerrequisitos: ['', Validators.required],
    dsiObjetivogeneralc: ['', Validators.required],
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
  this.datossilabForm = new FormGroup({
   
    dsiDescripcioncurso: new FormControl(),
    dsiPrerrequisitos: new FormControl(),
    dsiObjetivogeneralc: new FormControl(),
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









eliminar(ncuId: number){
 
 
   this.datosilabserv.delete(this.datos,ncuId).subscribe(
     data=>{
       console.log(data);
 
 
       this.datos = data;
       window.location.reload();

       this.contencursoserv.delete(this.contencur,this.contencur.ccuSilabo.dsiId).subscribe(
        data=>{
          console.log(data);
    
    
          this.contencur = data;
          window.location.reload();

          
        }
      )

       
     }
   )
 
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
