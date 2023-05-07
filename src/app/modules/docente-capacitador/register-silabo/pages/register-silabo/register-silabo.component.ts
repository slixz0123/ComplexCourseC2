import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datossilabo';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosdidacticos';
import { DatossilaboservService } from 'src/app/shared/Services/DatosSilaboServ/datossilaboserv.service';
import { HorasaprendizajeservService } from 'src/app/shared/Services/DatosSilaboServ/horasaprendizajeserv.service';
import { RecursosdidacticosservService } from 'src/app/shared/Services/DatosSilaboServ/recursosdidacticosserv.service';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';

@Component({
  selector: 'app-register-silabo',
  templateUrl: './register-silabo.component.html',
  styleUrls: ['./register-silabo.component.css']
})
export class RegisterSilaboComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router,private formbuilder:FormBuilder,private Datossilaserv:DatossilaboservService,private recursosdidacticosserv: RecursosdidacticosservService, private horasaprenserv:HorasaprendizajeservService)
  {
      
      _CargarSc.carga3(["silabo"])
  }
  silaboForm!: FormGroup;
  datosSila!: Datossilabo;

  
  datossilabo: Datossilabo = new Datossilabo;
  recurdidactico: RecursosDidacticos = new RecursosDidacticos;
  horasapren: HorasAprendizaje = new HorasAprendizaje;
    
  ngOnInit(): void {
      
        this.datossilabo.dsiDescripcioncurso= '';
        this.datossilabo.dsiPrerrequisitos = '';
        this.datossilabo.dsiObjetivogeneralc = '';
        this.datossilabo.dsiBibliografia = '';
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



        this.silaboForm = this.formbuilder.group({
       
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

        });
        this.silaboForm = new FormGroup({
         
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
        });
      }

 
crearsilabo(){
   
  this.datossilabo.dsiEstado=true
  //post de datos silabo   
  this.Datossilaserv.post(this.datossilabo).subscribe(silabdata =>{
        console.log(silabdata,"Data datos silabo")
       
      this.recurdidactico.rdiEstado=  true
      this.recurdidactico.rdiSilabo = silabdata
   //post de recusos didacticos
      this.recursosdidacticosserv.post(this.recurdidactico).subscribe(datarecurso =>{
      console.log(datarecurso,"Data recurso didactico")
      // post horas aprendde
       this.horasapren.hapEstado=true
       this.horasapren.hapSilabo = silabdata
      this.horasaprenserv.post(this.horasapren).subscribe(Datahorasapren =>{
        console.log(Datahorasapren,"Data horas aprendizaj")
      

        
  
          // this.Datossilaserv.getById( silabdata.dsiId).subscribe(datos => {
          //   console.log(datos);
          //   this.Datossilaserv.ge().forEach(silabos => {
          //     console.log(silabos)
          //     const EvaluacionEpra = {
              
          //       eraTipoactividades?: String;
          //       eraCantactvidades?: number;
          //       eraPorcentcalificacion?: number;
          //       eraTotal?: number;
          //       eraEstado?: boolean;

          //       eraTipoactividades: silabos.eraTipoactividades,
          //       valor_total: producto.cantidad * producto.valor_unitario,
          //       carrito: cari,
          //       producto: producto,};
          //         this.cartService.creardetalle(detallecarrito).subscribe(() => {
          //           // Eliminar el producto del carrito después de agregar su detalle
          //           this.cartService.removeItem(producto);
          //         });
          //       });
          //       //Finalmente, se utiliza el servicio cartService para crear los detalles de la 
          //       //orden de compra, eliminar los elementos del carrito y mostrar una notificación de 
          //       //éxito utilizando la biblioteca Swal. En general, esta función maneja todo el proceso
          //       // de compra en el carrito de compras de la aplicación.
    
          //       Swal.fire({
          //         position: 'center',
          //         icon: 'success',
          //         title: 'Compra realizada con exito',
          //         showConfirmButton: false,
          //         timer: 1500
          //       })
          // });
    













      
      
      })
    

    
    
    
    })

  })
     
    

}

}
