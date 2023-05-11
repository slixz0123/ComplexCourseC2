import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dias } from 'src/app/Core/models/dias';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';

@Component({
  selector: 'app-edit-list-dias',
  templateUrl: './edit-list-dias.component.html',
  styleUrls: ['./edit-list-dias.component.css']
})
export class EditListDiasComponent {
  dia?: Dias[];
  di: Dias = new Dias(); 
  selectedId: Dias = new Dias();
 editdiasForm:any
  seleccionarId(event: any) {
    this.selectedId = event.target?.value ?? 0;
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
  constructor( private diaserv: DiasService ,private router : Router,private _CargarSc: CargarjsTemplatesService,private formBuilder:FormBuilder){
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

ngOnInit(): void {
 
  
  this.diaserv.getAll().subscribe(Dias => {
     
    this.dia = Dias.filter(Dias => Dias.diaEstado !== false);
   
  });

  this.editdiasForm = this.formBuilder.group({
    diaNombre: ['', Validators.required],
    
  });

}

eliminar(id_dia: number){
 
 
   this.diaserv.delete(this.di,id_dia).subscribe(
     data=>{
       console.log(data);
 
 
       this.di = data;
       window.location.reload();
       
     }
   )
 
 }
 buscarporid(id_dia: number){
   this.di.diaId = this.di.diaId
   this.diaserv.getById(id_dia).subscribe(
     data =>{
       console.log(data)
     }
   )
 
   }

   editadia(diasedit:Dias,id_dia:number){

    this.diaserv.getById(id_dia).subscribe(
      data =>{
        console.log(data ,"encontrado")
         
       this.diaserv.update(diasedit,diasedit.diaId).subscribe(
         data=>{
          diasedit.diaNombre=this.diaSeleccionada.diaNombre
         diasedit.diaId=this.diaSeleccionada.diaId
           console.log(data,"actualixado");
  
          
         
           this.di = data;
          },
         error => {
          console.error(error);})
        },error => {
        console.error(error);
      }
  
    )
  
  }




}
