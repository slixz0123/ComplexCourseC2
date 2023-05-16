import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';

import { Dias } from 'src/app/Core/models/dias';
import { ModalidadCurso } from 'src/app/Core/models/modalidadCurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { ModalidadService } from 'src/app/shared/Services/modalidad.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import { TipoCursoService } from 'src/app/shared/Services/tipoCurso.service';

@Component({
  selector: 'app-reponecesidad',
  templateUrl: './reponecesidad.component.html',
  styleUrls: ['./reponecesidad.component.css']
})
export class ReponecesidadComponent {
  neceForm!: FormGroup;

  selectedId: TiposCurso = new TiposCurso();
  selectedId2: ModalidadCurso = new ModalidadCurso();
  selectedId3: Dias = new Dias();

  necesidadcurso!: NecesidadCurso;
  tipocurso : TiposCurso[]=[];

  modalidadcurso!: ModalidadCurso;
  modacurso : ModalidadCurso[]=[];

  diasnew!: Dias;
  arraydias : Dias[]=[];

  


 
    necesidad: NecesidadCurso = new NecesidadCurso;

    tipocur: TiposCurso = new TiposCurso; 

    modcur: ModalidadCurso = new ModalidadCurso; 

    newdias: Dias = new Dias; 

    cursoob: Curso = new Curso();

    constructor(private necesidadserv: NecesidadCursoService,
     private tipocursoserv:TipoCursoService , private modalidadcursoserv:ModalidadService,private diaserv:DiasService,private cursoserv:CursoService,private formbuilder:FormBuilder) {
      }
  
      ngOnInit(): void {
        this.necesidad.ncuId = 0;
        this.necesidad.ncuLugardicta= '';
        this.necesidad.ncuNumparticipantes = 0;
        this.necesidad.ncuPoblaciondirigida = '';
        this.necesidad.ncuResumenyproyecto = '';
        this.necesidad.ncuEstado = true;
        this.tipocur.tcuId=0;
        this.modcur.mcuId=0;
        this.newdias.diaId=0;


       this.cursoob.curNombre='';
       this.cursoob.curNumHoras=0;
       this.cursoob.tipoCurso.tcuNombre='';
       this.cursoob.mcursos.mcuNombre='';

       
       
       this.cursoob.curNombre='';
       this.cursoob.curNombre='';


        localStorage.removeItem('num_placa');  
        this.getcursos();
        this.vertipocurso();
        this.getmodalidad();
        this.vertmoda();
        this.getdias();
        this.vertdia();

        // ncuId?: number;
        // ncuFechaprevisfin?: Date;
        // ncuNumparticipantes?: number;
        // ncuResumenyproyecto?: string;
        // ncuPoblaciondirigida?: string;
        // ncuLugardicta?: string;
        // ncuEstado?: boolean; 
        // curId?: number;
        // curCodigo?: String;
        // curNombre?: string;
        // curFechainicio?: Date;
        // curFechafin?: Date;
        // curNumhoras?: number;
        // curProceso?: string;
        // curEstado?: boolean;

        this.neceForm = this.formbuilder.group({
      
          ncuId: ['', Validators.required],
          ncuFechaprevisfin: ['', Validators.required],
          ncuNumparticipantes: ['', Validators.required],
          ncuResumenyproyecto: ['', Validators.required],
          ncuLugardicta: ['', Validators.required],
          ncuEstado: ['', Validators.required],
          ncuPoblaciondirigida: [this.selectedId, Validators.required],
          curId: ['', Validators.required],
          curCodigo: ['', Validators.required],
          curNombre: ['', Validators.required],
          curFechainicio: ['', Validators.required],
          curFechafin: ['', Validators.required],
          curNumhoras: [this.selectedId, Validators.required],
          curProceso: ['', Validators.required],
          curEstado: ['', Validators.required],
          
        });
        this.neceForm = new FormGroup({
 
          ncuId: new FormControl(),
 
          ncuFechaprevisfin: new FormControl(),
          ncuNumparticipantes: new FormControl(),
          ncuResumenyproyecto: new FormControl(),
          ncuLugardicta: new FormControl(),
          ncuEstado: new FormControl(),
          ncuPoblaciondirigida:new FormControl(),
          curId: new FormControl(),
          curCodigo: new FormControl(),
          curNombre: new FormControl(),
          curFechainicio: new FormControl(),
          curFechafin: new FormControl(),
          curNumhoras: new FormControl(),
          curProceso: new FormControl(),
          curEstado: new FormControl(),
          
        });
      }


  sendData(selectedValue: number) {

    const payload = { id: selectedValue };
    this.tipocursoserv.getPorId( payload).subscribe(
      (response) => {
        console.log('Solicitud POST enviada con éxito:', response);
      },
      (error) => {
        console.log('Error al enviar la solicitud POST:', error);
      }
    );
  }
  sendData2(selectedValue2: number) {

    const payload = { id: selectedValue2 };
    this.modalidadcursoserv.getPorId( payload).subscribe(
      (response) => {
        console.log('Solicitud POST enviada con éxito:', response);
      },
      (error) => {
        console.log('Error al enviar la solicitud POST:', error);
      }
    );
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

  getcursos(){
    this.tipocursoserv.getAll().subscribe(
     claseL =>this.tipocurso = claseL
    );}

  getmodalidad(){
      this.modalidadcursoserv.getAll().subscribe(
       clasemod =>this.modacurso = clasemod
      );}

  getdias(){
        this.diaserv.getAll().subscribe(
         clasedia =>this.arraydias = clasedia
        );}

  vertipocurso(){
  this.tipocursoserv.getAll().subscribe(
     result => {
    console.log(result)
    })
   this.tipocursoserv.getPorId(this.tipocur.tcuId).subscribe(
    result => {
    console.log(result)
    })
  }

  vertmoda(){
    this.modalidadcursoserv.getAll().subscribe(
       result => {
      console.log(result)
      })
     this.modalidadcursoserv.getPorId(this.tipocur.tcuId).subscribe(
      result => {
      console.log(result)
      })
    }

  vertdia(){
      this.diaserv.getAll().subscribe(
         result => {
        console.log(result)
        })
       this.diaserv.getPorId(this.newdias.diaId).subscribe(
        result => {
        console.log(result)
        })
      }


  onSelectChange(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }
  
    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedId.tcuId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }

  onSelectChange2(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }
  
    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedId2.mcuId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }

  onSelectChange3(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; // Salimos de la función si no hay ningún elemento seleccionado
    }
  
    const selectedValue = selectElement.value;
    console.log(selectedValue); // muestra el valor seleccionado en la consola
    this.selectedId3.diaId = Number(selectedValue);// this.automovil.claseautomovil.id_clase = Number(selectedValue);  // llama al método sendData y pasa el valor seleccionado
  }

crearcurso(){
 // this.cursoserv.post(this.cursoob).subscribe(dataprod => {
   //   console.log(dataprod);

   
      this.necesidad.dia =  this.selectedId3
     
      this.diaserv.getById(this.necesidad.dia.diaId).subscribe(diadata => {
       console.log(diadata);
     
       this.necesidad.dia = diadata
       this.necesidad.ncuEstado = true
      
        this.necesidadserv.post(this.necesidad).subscribe(dataprod => {
        console.log(dataprod);

          
      })
    })
 // })
}

  // placeOrder() {

  //   this.cursoserv.post(this.cursoob).subscribe(dataprod => {
  //     console.log(dataprod);
      


  //   }
  //   this.persoservice.getPorId(this.id_persona).subscribe(dataprod => {
  //     console.log(dataprod);
  //     const per = dataprod;
  //     this.carrito.fecha_carrito =  new Date(),
  //     this.carrito.estado_carrito= 'pagado'
  //     this.carrito.valor_total = this.getTotal()
  //     this.carrito.persona_carrito=dataprod
  //     //la función utiliza el servicio cartService para realizar el pago y generar un nuevo carrito. 
  //     //Una vez que se ha generado el carrito, se utiliza su ID para obtener el carrito completo
  //     // mediante el servicio cartService.getByIdcarrito().
  //     this.cartService.checkout(this.carrito).subscribe(response=> {
  //       console.log(response);
  //       this.items = [];
  //       //para recorrer los elementos del carrito y crear un nuevo objeto detallecarrito para 
  //       //cada elemento. Para cada objeto detallecarrito, se establecen sus propiedades, como 
  //       //la cantidad y el valor total. El objeto carrito y el objeto producto se asignan como 
  //       //valores de las propiedades carrito y producto respectivamente.
  //       this.cartService.getByIdcarrito( response.id_carrito).subscribe(cari => {
  //         console.log(cari);
  //         this.cartService.getItems().forEach(producto => {
  //           console.log(producto)
  //           const detallecarrito = {
  //             cantidad: producto.cantidad,
  //             valor_total: producto.cantidad * producto.valor_unitario,
  //             carrito: cari,
  //             producto: producto,};
  //               this.cartService.creardetalle(detallecarrito).subscribe(() => {
  //                 // Eliminar el producto del carrito después de agregar su detalle
  //                 this.cartService.removeItem(producto);
  //               });
  //             });
  //             //Finalmente, se utiliza el servicio cartService para crear los detalles de la 
  //             //orden de compra, eliminar los elementos del carrito y mostrar una notificación de 
  //             //éxito utilizando la biblioteca Swal. En general, esta función maneja todo el proceso
  //             // de compra en el carrito de compras de la aplicación.
  
  //             Swal.fire({
  //               position: 'center',
  //               icon: 'success',
  //               title: 'Compra realizada con exito',
  //               showConfirmButton: false,
  //               timer: 1500
  //             })
  //       });
  //     });
  //   });
  
  
  // }

}
