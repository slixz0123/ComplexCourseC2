import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadcurso';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { NecesidadCursoserviceService } from 'src/app/shared/Services/necesidad-cursoservice.service';

@Component({
  selector: 'app-edit-list-necesidad',
  templateUrl: './edit-list-necesidad.component.html',
  styleUrls: ['./edit-list-necesidad.component.css']
})
export class EditListNecesidadComponent {
  dia?: Dias[];
  di: Dias = new Dias(); 
  selectedId: Dias = new Dias();

  necesidadcurs?: NecesidadCurso[];
  necesidad: NecesidadCurso = new NecesidadCurso(); 
  selectedIdcur: NecesidadCurso = new NecesidadCurso();

  neceForm:any
 arraydias : Dias[]=[];

  seleccionarId(event: any) {
    this.selectedId = event.target?.value ?? 0;
  }
  seleccionarIdcur(event: any) {
    this.selectedIdcur = event.target?.value ?? 0;
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
    this.selectedIdcur.ncuId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }

  constructor( private diaserv: DiasService ,private necesidadserv:NecesidadCursoserviceService,private router : Router,private _CargarSc: CargarjsTemplatesService,private formBuilder:FormBuilder){
    _CargarSc.carga3(["modal"])
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

neceseleccionada: NecesidadCurso = new NecesidadCurso;

selecnece(nece: NecesidadCurso,id:number) {
  this.neceseleccionada = nece;
  this.necesidad.ncuId = nece.ncuId
  this.necesidadserv.getById(id).subscribe(
    data =>{
      console.log(data)
    }
  )
}

ngOnInit(): void {
 
  

  this.necesidadserv.getAll().subscribe(NecesidadCurso => {
     
    this.necesidadcurs = NecesidadCurso.filter(NecesidadCurso => NecesidadCurso.ncuEstado !== false);
   
  });

  this.neceForm = this.formBuilder.group({
    ncuId: ['', Validators.required],
    ncuFechaprevisfin: ['', Validators.required],
    ncuNumparticipantes: ['', Validators.required],
    ncuResumenyproyecto: ['', Validators.required],
    ncuLugardicta: ['', Validators.required],
    ncuEstado: ['', Validators.required],
    ncuPoblaciondirigida: ['', Validators.required],
    
  });

}









eliminar(ncuId: number){
 
 
   this.necesidadserv.delete(this.necesidad,ncuId).subscribe(
     data=>{
       console.log(data);
 
 
       this.necesidad = data;
       window.location.reload();
       
     }
   )
 
 }


   editadia(neceedit:NecesidadCurso,id_dia:number){

    this.necesidadserv.getById(id_dia).subscribe(
      data =>{
        console.log(data ,"encontrado")
         
       this.necesidadserv.update(neceedit,neceedit.ncuId).subscribe(
         data=>{
          neceedit.ncuLugardicta=this.neceseleccionada.ncuLugardicta
          neceedit.dia=this.neceseleccionada.dia
          neceedit.ncuFechaprevisfin=this.neceseleccionada.ncuFechaprevisfin
          neceedit.ncuNumparticipantes=this.neceseleccionada.ncuNumparticipantes
          neceedit.ncuResumenyproyecto=this.neceseleccionada.ncuResumenyproyecto
          neceedit.ncuPoblaciondirigida=this.neceseleccionada.ncuPoblaciondirigida
          neceedit.ncuId=this.neceseleccionada.ncuId
           console.log(data,"actualixado");
  
          
         
           this.necesidad = data;
          },
         error => {
          console.error(error);})
        },error => {
        console.error(error);
      }
  
    )
  
  }


}
