import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import Swal from'sweetalert2';
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

  constructor( private diaserv: DiasService ,private necesidadserv:NecesidadCursoService,private router : Router,private _CargarSc: CargarjsTemplatesService,private formBuilder:FormBuilder){
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


  getdias(){
        this.diaserv.getAll().subscribe(
         clasedia =>this.arraydias = clasedia.filter(clasedia=>clasedia.diaEstado!==false)

   
        );}




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
    ncuIdentificador: ['', Validators.required],
    ncuResumenyproyecto: ['', Validators.required],
    ncuLugardicta: ['', Validators.required],
    ncuEstado: ['', Validators.required],
    ncuPoblaciondirigida: ['', Validators.required],
    
  });

  this.getdias()
}









eliminar(ncuId: number){
 
 
   
 


   const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Estas seguro que desas eliminar este registro?',
    text: "Tu np podras revertir este cambio!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar!',
    cancelButtonText: 'No, Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.necesidadserv.delete(this.necesidad,ncuId).subscribe(
        data=>{
          console.log(data);

          this.necesidad = data;
 
        }
      )

      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'Tu registro se borró exitosmente.',
        'success',
      )
      
     
      
     
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu registro de necesidad no se borró :)',
        'error'
      )
    }
  })








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
